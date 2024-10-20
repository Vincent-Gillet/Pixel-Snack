<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Recipe;
use App\Models\User;
use App\Models\Ingredient;
use App\Models\Diet;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\RecipeController;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
use PHPUnit\Framework\Attributes\RunInSeparateProcess;
use PHPUnit\Framework\Attributes\PreserveGlobalState;

class RecipeControllerUnitTest extends TestCase
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
        // Créer un utilisateur factice
        $user = User::factory()->create();

        // Créer des recettes factices
        Recipe::factory()->count(3)->create(['user_id' => $user->id]);

        // Appeler la méthode du contrôleur
        $controller = new RecipeController();
        $response = $controller->index();

        // Assertions
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertCount(3, $response->getData());
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_show_unit()
    {
        $user = User::factory()->create();

        $recipe = Recipe::factory()->create(['user_id' => $user->id]);

        $controller = new RecipeController();
        $response = $controller->show($recipe->id);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals($recipe->id, $response->getData()->id);
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_show_unit_not_found()
    {
        $controller = new RecipeController();
        $response = $controller->show(999);

        $this->assertEquals(404, $response->getStatusCode());
        $this->assertEquals('Recipe not found', $response->getData()->message);
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    // public function test_store_unit()
    // {
    //     // Créer un utilisateur administrateur
    //     $admin = User::factory()->create(['role' => 'admin']);

    //     // Créer des ingrédients et des régimes alimentaires valides
    //     $ingredient = Ingredient::factory()->create();
    //     $diet = Diet::factory()->create();
    //     $category = Category::factory()->create();

    //     // Simuler l'authentification de l'utilisateur administrateur
    //     $this->actingAs($admin, 'api');

    //     // Créer une requête POST simulée
    //     $request = Request::create('/recipes', 'POST', [
    //         'title' => 'Spaghetti Bolognese',
    //         'description' => 'A classic Italian pasta dish',
    //         'image' => 'image_url',
    //         'video' => 'video_url',
    //         'total_time' => 45,
    //         'preparation_time' => 15,
    //         'rest_time' => 10,
    //         'cooking_time' => 20,
    //         'title_reference' => 'Reference Title',
    //         'episode_reference' => 'Episode 1',
    //         'description_reference' => 'Description of the reference',
    //         'logo_platform_reference' => 'https://example.com/logo.png',
    //         'logo_platform_url_reference' => 'https://example.com',
    //         'image_recipe_reference' => 'https://example.com/image.jpg',
    //         'ingredients' => [
    //             [
    //                 'id' => $ingredient->id,
    //                 'quantity' => '2',
    //                 'unit' => 'pieces'
    //             ]
    //         ],
    //         'diets' => [
    //             [
    //                 'id' => $diet->id
    //             ]
    //         ],
    //         'category_ids' => [$category->id],
    //     ]);


    //     // Appeler la méthode du contrôleur
    //     $controller = new RecipeController();
    //     $response = $controller->store($request);

    //     // Journaux de débogage
    //     Log::info('Response: ', (array) $response->getData());

    //     // Assertions
    //     $this->assertEquals(201, $response->getStatusCode());
    //     $this->assertEquals('Spaghetti Bolognese', $response->getData()->recipe->title);
    //     $this->assertNotNull($response->getData()->recipe->id);
    // }

    public function test_store_unit_validation_error()
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin, 'api');

        $request = Request::create('/recipes', 'POST', ['title' => '']); 

        $controller = new RecipeController();

        $response = $controller->store($request);

        $this->assertEquals(400, $response->getStatusCode());
        $this->assertEquals('Validation error', $response->getData()->message);
    }


    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_update_unit()
    {
        $user = User::factory()->create();

        $recipe = Recipe::factory()->create(['user_id' => $user->id, 'title' => 'Old Recipe']);

        $request = Request::create('/recipes/' . $recipe->id, 'PUT', ['title' => 'Updated Recipe']);

        $controller = new RecipeController();
        $response = $controller->update($request, $recipe->id);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('Updated Recipe', $response->getData()->recipe->title);
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_update_unit_not_found()
    {
        $request = Request::create('/recipes/999', 'PUT', ['title' => 'Updated Recipe']);

        $controller = new RecipeController();
        $response = $controller->update($request, 999);

        $this->assertEquals(404, $response->getStatusCode());
        $this->assertEquals('Recipe not found', $response->getData()->message);
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_destroy_unit()
    {
        $user = User::factory()->create();

        $recipe = Recipe::factory()->create(['user_id' => $user->id]);

        $controller = new RecipeController();
        $response = $controller->destroy($recipe->id);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('Recipe deleted successfully', $response->getData()->message);
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_destroy_unit_not_found()
    {
        $controller = new RecipeController();
        $response = $controller->destroy(999);

        $this->assertEquals(404, $response->getStatusCode());
        $this->assertEquals('Recipe not found', $response->getData()->message);
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_get_filter_unit()
    {
        $user = User::factory()->create();

        Recipe::factory()->create(['title' => 'Spaghetti Bolognese', 'user_id' => $user->id]);
        Recipe::factory()->create(['title' => 'Vegetarian Pizza', 'user_id' => $user->id]);

        $request = Request::create('/recipes/filter', 'GET', ['title' => 'Spaghetti']);

        $controller = new RecipeController();
        $response = $controller->getFilter($request);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertCount(1, $response->getData()->recipes);
        $this->assertEquals('Spaghetti Bolognese', $response->getData()->recipes[0]->title);
    }

    #[RunInSeparateProcess]
    #[PreserveGlobalState(false)]
    public function test_get_filter_unit_not_found()
    {
        $request = Request::create('/recipes/filter', 'GET', ['title' => 'Nonexistent Recipe']);

        $controller = new RecipeController();
        $response = $controller->getFilter($request);

        $this->assertEquals(404, $response->getStatusCode());
        $this->assertEquals('Recipe not found', $response->getData()->message);
    }
}