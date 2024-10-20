<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Diet;
use App\Models\User;
use App\Http\Controllers\DietController;
use Illuminate\Http\Request;
use PHPUnit\Framework\Attributes\RunInSeparateProcess;
use PHPUnit\Framework\Attributes\PreserveGlobalState;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DietControllerUnitTest extends TestCase
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
    public function test_store_unit()
    {
        // Créer un utilisateur administrateur
        $admin = User::factory()->create(['role' => 'admin']);

        // Simuler l'authentification de l'utilisateur administrateur
        $this->actingAs($admin, 'api');

        // Créer une requête POST simulée
        $request = Request::create('/diets', 'POST', [
            'name' => 'New Diet'
        ]);

        // Appeler la méthode du contrôleur
        $controller = new DietController();
        $response = $controller->store($request);

        // Assertions
        $this->assertEquals(201, $response->getStatusCode());
        $this->assertEquals('New Diet', $response->getData()->diet->name);
        $this->assertNotNull($response->getData()->diet->id);
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_show_unit()
    {
        $diet = Diet::factory()->create(['name' => 'Diet 1']);

        $controller = new DietController();
        $response = $controller->show($diet->id);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals($diet->id, $response->getData()->diet->id);
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_show_unit_not_found()
    {
        $controller = new DietController();
        $response = $controller->show(999);

        $this->assertEquals(404, $response->getStatusCode());
        $this->assertEquals('Régime non trouvé', $response->getData()->message);
    }

    public function test_store_unit_validation_error()
    {
        $request = Request::create('/diets', 'POST', ['name' => '']); // Champ vide

        $controller = new DietController();

        $this->expectException(\Illuminate\Validation\ValidationException::class);

        $controller->store($request);
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_update_unit_not_found()
    {
        $request = Request::create('/diets/999', 'PUT', ['name' => 'Updated Diet']);

        $controller = new DietController();
        $response = $controller->update($request, 999);

        $this->assertEquals(404, $response->getStatusCode());
        $this->assertEquals('Régime non trouvé', $response->getData()->message);
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_destroy_unit_not_found()
    {
        $controller = new DietController();
        $response = $controller->destroy(999);

        $this->assertEquals(404, $response->getStatusCode());
        $this->assertEquals('Régime non trouvé', $response->getData()->message);
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_index_unit()
    {
        Diet::factory()->count(3)->create();

        $controller = new DietController();
        $response = $controller->index();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertCount(3, $response->getData()->diets);
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_update_unit()
    {
        $diet = Diet::factory()->create(['name' => 'Old Diet']);

        $request = Request::create('/diets/' . $diet->id, 'PUT', ['name' => 'Updated Diet']);

        $controller = new DietController();
        $response = $controller->update($request, $diet->id);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('Updated Diet', $response->getData()->diet->name);
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_destroy_unit()
    {
        $diet = Diet::factory()->create();

        $controller = new DietController();
        $response = $controller->destroy($diet->id);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('Régime supprimé avec succès', $response->getData()->message);
    }
}