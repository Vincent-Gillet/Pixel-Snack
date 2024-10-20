<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Diet;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DietControllerFunctionalTest extends TestCase
{
    use RefreshDatabase;

    public function test_index()
    {
        Diet::factory()->count(3)->create();

        $response = $this->get('/api/v1/diets');

        $response->assertStatus(200);
        $response->assertJsonCount(3, 'diets');
    }

    public function test_show()
    {
        $diet = Diet::factory()->create();

        $response = $this->get("/api/v1/diets/{$diet->id}");

        $response->assertStatus(200);
        $response->assertJson(['diet' => $diet->toArray()]);
    }

    public function test_show_not_found()
    {
        $response = $this->get('/api/v1/diets/999');

        $response->assertStatus(404);
        $response->assertJson(['message' => 'Régime non trouvé']);
    }

    public function test_store()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($user, 'sanctum');

        $data = [
            'name' => 'New Diet',
        ];

        $response = $this->post('/api/v1/admin/diets', $data);

        $response->assertStatus(201);
        $response->assertJson(['diet' => ['name' => 'New Diet']]);
        $this->assertDatabaseHas('diets', ['name' => 'New Diet']);
    }

    public function test_update()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($user, 'sanctum');

        $diet = Diet::factory()->create();

        $data = [
            'name' => 'Updated Diet',
        ];

        $response = $this->put("/api/v1/admin/diets/{$diet->id}", $data);

        $response->assertStatus(200);
        $response->assertJson(['diet' => ['name' => 'Updated Diet']]);
        $this->assertDatabaseHas('diets', ['name' => 'Updated Diet']);
    }

    public function test_update_not_found()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($user, 'sanctum');

        $data = [
            'name' => 'Updated Diet',
        ];

        $response = $this->put('/api/v1/admin/diets/999', $data);

        $response->assertStatus(404);
        $response->assertJson(['message' => 'Régime non trouvé']);
    }

    public function test_destroy()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($user, 'sanctum');

        $diet = Diet::factory()->create();

        $response = $this->delete("/api/v1/admin/diets/{$diet->id}");

        $response->assertStatus(200);
        $response->assertJson(['message' => 'Régime supprimé avec succès']);
        $this->assertDatabaseMissing('diets', ['id' => $diet->id]);
    }

    public function test_destroy_not_found()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($user, 'sanctum');

        $response = $this->delete('/api/v1/admin/diets/999');

        $response->assertStatus(404);
        $response->assertJson(['message' => 'Régime non trouvé']);
    }
}
