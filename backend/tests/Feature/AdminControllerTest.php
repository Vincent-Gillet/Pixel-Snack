<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Recipe;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AdminControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_list_users()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin, 'sanctum');

        $this->assertAuthenticatedAs($admin);

        User::factory()->count(10)->create();

        $this->assertCount(11, User::all());

        $response = $this->get('/api/v1/admin/users');

        $response->assertStatus(200);

        $response->assertJsonStructure(['data' => ['*' => ['id', 'name', 'email']]]);
    }

    public function test_show_user()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin, 'sanctum');

        $user = User::factory()->create();

        $response = $this->get("/api/v1/admin/users/{$user->id}");

        $response->assertStatus(200);
        $response->assertJson(['user' => $user->toArray()]);
    }

    public function test_create_user()
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

    public function test_delete_user()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin, 'sanctum');

        $user = User::factory()->create();

        $response = $this->delete("/api/v1/admin/delete-user/{$user->id}");

        $response->assertStatus(200);
        $response->assertJson(['message' => 'User deleted successfully']);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_show_recipes()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin, 'sanctum');
    
        Recipe::factory()->count(5)->create(['user_id' => $admin->id]);
    
        $response = $this->get('/api/v1/admin/recipes');
    
        $response->assertStatus(200);
        $response->assertJsonStructure(['recipes' => ['*' => ['id', 'title', 'description']]]);
    }
}