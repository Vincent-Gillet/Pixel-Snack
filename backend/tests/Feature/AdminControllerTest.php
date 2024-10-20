<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Recipe;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\AdminController;
use Mockery;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AdminControllerTest extends TestCase
{
    use DatabaseMigrations;

    public function tearDown(): void
    {
        Mockery::close();
        parent::tearDown(); // Appeler la méthode tearDown de la classe parente
    }

    /* Tests Fonctionnels */

    public function test_list_users_functional()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin, 'sanctum');

        User::factory()->count(10)->create();

        $response = $this->get('/api/v1/admin/users');

        $response->assertStatus(200);
        $response->assertJsonStructure(['data' => ['*' => ['id', 'name', 'email']]]);
    }

    public function test_show_user_functional()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin, 'sanctum');

        $user = User::factory()->create();

        $response = $this->get("/api/v1/admin/users/{$user->id}");

        $response->assertStatus(200);
        $response->assertJson(['user' => $user->toArray()]);
    }

    public function test_create_user_functional()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin, 'sanctum');

        $data = [
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'password' => 'password123',
        ];

        $response = $this->post('/api/v1/admin/create-user', $data);

        $response->assertStatus(201);
        $response->assertJson(['message' => 'User created successfully']);
        $this->assertDatabaseHas('users', ['email' => 'newuser@example.com']);
    }

    public function test_delete_user_functional()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin, 'sanctum');

        $user = User::factory()->create();

        $response = $this->delete("/api/v1/admin/delete-user/{$user->id}");

        $response->assertStatus(200);
        $response->assertJson(['message' => 'User deleted successfully']);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_show_recipes_functional()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin, 'sanctum');
    
        Recipe::factory()->count(5)->create(['user_id' => $admin->id]);
    
        $response = $this->get('/api/v1/admin/recipes');
    
        $response->assertStatus(200);
        $response->assertJsonStructure(['recipes' => ['*' => ['id', 'title', 'description']]]);
    }

    /* Tests Unitaires */

    public function test_list_users()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin, 'sanctum');

        User::factory()->count(5)->create(); // Créer 5 utilisateurs

        $controller = new AdminController();
        $response = $controller->listUsers(new Request());

        $this->assertEquals(200, $response->getStatusCode());
        // Exclure l'utilisateur administrateur du comptage
        $this->assertCount(5, array_filter($response->getData(true)['data'], function ($user) use ($admin) {
            return $user['id'] !== $admin->id;
        }));
    }

    public function test_show_user()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin, 'sanctum');
    
        // Inclure la clé termsAccepted dans l'utilisateur créé
        $user = User::factory()->create(['termsAccepted' => 0]);
    
        $controller = new AdminController();
        $response = $controller->showUser($user->id);
    
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals($user->toArray(), $response->getData(true)['user']);
    }

    public function test_show_user_not_found()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin, 'sanctum');

        $controller = new AdminController();
        $response = $controller->showUser(999);

        $this->assertEquals(404, $response->getStatusCode());
        $this->assertEquals('User not found', $response->getData(true)['message']);
    }

    public function test_create_user()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin, 'sanctum');

        $request = new Request([
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'password' => 'password123'
        ]);

        $controller = new AdminController();
        $response = $controller->createUser($request);

        $this->assertEquals(201, $response->getStatusCode());
        $this->assertDatabaseHas('users', ['email' => 'john.doe@example.com']);
    }

    public function test_create_user_validation_failure()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin, 'sanctum');

        $request = new Request([
            'name' => '',
            'email' => 'invalid-email',
            'password' => 'short'
        ]);

        $controller = new AdminController();

        $this->expectException(ValidationException::class);
        $controller->createUser($request);
    }

    public function test_delete_user_unit()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin, 'sanctum');

        $user = User::factory()->create();

        // Mock de la requête
        $request = Mockery::mock(Request::class);
        $request->shouldReceive('user')->andReturn($admin);

        // Mock de l'utilisateur
        $userMock = Mockery::mock(User::class);
        $userMock->shouldReceive('findOrFail')->with($user->id)->andReturn($userMock);
        $userMock->shouldReceive('delete')->andReturn(true);

        // Appeler la méthode deleteUser
        $controller = new AdminController();
        $response = $controller->deleteUser($user->id);

        // Vérifier la réponse
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals(['message' => 'User deleted successfully'], $response->getData(true));
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    // public function test_show_recipes_unit()
    // {
    //     $admin = User::factory()->create(['role' => 'admin']);
    //     $this->actingAs($admin, 'sanctum');
    
    //     // Mock des recettes
    //     $recipes = Recipe::factory()->count(5)->make(['user_id' => $admin->id]);
    
    //     // Utiliser Mockery pour simuler l'appel à la méthode all
    //     $recipeMock = Mockery::mock('App\Models\Recipe');
    //     $recipeMock->shouldReceive('all')->andReturn($recipes);
    
    //     // Remplacer l'instance de Recipe par le mock
    //     $this->app->instance('App\Models\Recipe', $recipeMock);
    
    //     // Appeler la méthode showRecipes
    //     $controller = new AdminController();
    //     $response = $controller->showRecipes();
    
    //     // Vérifier la réponse
    //     $this->assertEquals(200, $response->getStatusCode());
    
    //     // Vérifier le contenu de la réponse
    //     $responseData = $response->getData(true);
    //     $this->assertArrayHasKey('recipes', $responseData, 'La clé "recipes" est absente de la réponse.');
    //     $this->assertCount(5, $responseData['recipes'], 'Le nombre de recettes retournées est incorrect.');
    
    //     // Vérifier les propriétés spécifiques des recettes
    //     foreach ($recipes as $index => $recipe) {
    //         $this->assertEquals($recipe->title, $responseData['recipes'][$index]['title']);
    //         $this->assertEquals($recipe->description, $responseData['recipes'][$index]['description']);
    //     }
    // }
}