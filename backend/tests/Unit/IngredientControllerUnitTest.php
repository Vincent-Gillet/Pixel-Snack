<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Ingredient;
use App\Models\User;
use App\Http\Controllers\IngredientController;
use Illuminate\Http\Request;
use PHPUnit\Framework\Attributes\RunInSeparateProcess;
use PHPUnit\Framework\Attributes\PreserveGlobalState;
use Illuminate\Foundation\Testing\RefreshDatabase;

class IngredientControllerUnitTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate');
    }

    protected function tearDown(): void
    {
        parent::tearDown();
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_index_unit()
    {
        // Créer des ingrédients factices
        Ingredient::factory()->count(3)->create();

        // Appeler la méthode du contrôleur
        $controller = new IngredientController();
        $response = $controller->index();

        // Assertions
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertCount(3, $response->getData()->ingredients);
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_show_unit()
    {
        $ingredient = Ingredient::factory()->create(['name' => 'Pomme']);

        $controller = new IngredientController();
        $response = $controller->show($ingredient->id);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals($ingredient->id, $response->getData()->ingredient->id);
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_show_unit_not_found()
    {
        $controller = new IngredientController();
        $response = $controller->show(999);

        $this->assertEquals(404, $response->getStatusCode());
        $this->assertEquals('Ingrédient non trouvé', $response->getData()->message);
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_store_unit()
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin, 'api');

        $request = Request::create('/admin/ingredients', 'POST', [
            'name' => 'Tomato'
        ]);

        $controller = new IngredientController();
        $response = $controller->store($request);

        $this->assertEquals(201, $response->getStatusCode());
        $this->assertEquals('Tomato', $response->getData()->ingredient->name);
        $this->assertNotNull($response->getData()->ingredient->id);
    }

    public function test_store_unit_validation_error()
    {
        $request = Request::create('/admin/ingredients', 'POST', ['name' => '']); 

        $controller = new IngredientController();

        $this->expectException(\Illuminate\Validation\ValidationException::class);

        $controller->store($request);
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_update_unit()
    {
        $ingredient = Ingredient::factory()->create(['name' => 'Old Ingredient']);

        $request = Request::create('/admin/ingredients/' . $ingredient->id, 'PUT', ['name' => 'Updated Ingredient']);

        $controller = new IngredientController();
        $response = $controller->update($request, $ingredient->id);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('Updated Ingredient', $response->getData()->ingredient->name);
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_update_unit_not_found()
    {
        $request = Request::create('/admin/ingredients/999', 'PUT', ['name' => 'Updated Ingredient']);

        $controller = new IngredientController();
        $response = $controller->update($request, 999);

        $this->assertEquals(404, $response->getStatusCode());
        $this->assertEquals('Ingrédient non trouvé', $response->getData()->message);
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_destroy_unit()
    {
        $ingredient = Ingredient::factory()->create();

        $controller = new IngredientController();
        $response = $controller->destroy($ingredient->id);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('Ingrédient supprimé avec succès', $response->getData()->message);
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_destroy_unit_not_found()
    {
        $controller = new IngredientController();
        $response = $controller->destroy(999);

        $this->assertEquals(404, $response->getStatusCode());
        $this->assertEquals('Ingrédient non trouvé', $response->getData()->message);
    }
}