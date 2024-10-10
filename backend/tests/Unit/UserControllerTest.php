<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_be_retrieved()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $response = $this->get("/api/v1/users/{$user->id}/edit");

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'User edit form',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]
        ]);
    }

    public function test_user_can_be_updated()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $response = $this->put("/api/v1/users/{$user->id}", [
            'name' => 'Jane Doe',
            'email' => 'jane.doe@example.com',
            'role' => 'user', 
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Jane Doe',
            'email' => 'jane.doe@example.com',
        ]);
    }

    public function test_user_can_be_deleted()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $response = $this->delete("/api/v1/users/{$user->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('users', [
            'id' => $user->id,
        ]);
    }

    public function test_user_update_fails_with_invalid_data()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $response = $this->put("/api/v1/users/{$user->id}", [
            'name' => '', // Nom vide
            'email' => 'invalid-email', // Email invalide
            'role' => '', // Rôle vide
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['name', 'email', 'role']);
    }
}