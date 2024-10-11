<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Ingredient;
use Illuminate\Foundation\Testing\RefreshDatabase;

class IngredientControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index()
    {
        Ingredient::factory()->count(3)->create();

        $response = $this->get('/api/v1/ingredients');

        $response->assertStatus(200);
        $response->assertJsonCount(3, 'ingredients');
    }

    public function test_show()
    {
        $user = User::factory()->create(['role' => 'admin']);        
        $this->actingAs($user, 'sanctum');
    
        $ingredient = Ingredient::factory()->create();
    
        $response = $this->get("/api/v1/admin/ingredients/{$ingredient->id}");
    
        $response->assertStatus(200);
        $response->assertJson([
            'ingredient' => [
                'id' => $ingredient->id,
                'name' => $ingredient->name,
            ]
        ]);
    }

    public function test_show_not_found()
    {
        $user = User::factory()->create(['role' => 'admin']);        
        $this->actingAs($user, 'sanctum');

        $response = $this->get('/api/v1/admin/ingredients/999');

        $response->assertStatus(404);
        $response->assertJson(['message' => 'Ingrédient non trouvé']);
    }

    public function test_store()
    {
        $user = User::factory()->create(['role' => 'admin']);        
        $this->actingAs($user, 'sanctum');
    
        $data = [
            'name' => 'New Ingredient',
        ];
    
        $response = $this->post('/api/v1/admin/ingredients', $data);
    
        $response->assertStatus(201);
        $response->assertJsonStructure([
            'ingredient' => [
                'id',
                'name',
                'created_at',
                'updated_at',
            ]
        ]);
        $this->assertDatabaseHas('ingredients', ['name' => 'New Ingredient']);
    }

    public function test_update()
    {
        $user = User::factory()->create(['role' => 'admin']);        
        $this->actingAs($user, 'sanctum');

        $ingredient = Ingredient::factory()->create();

        $data = [
            'name' => 'Updated Ingredient',
        ];

        $response = $this->put("/api/v1/admin/ingredients/{$ingredient->id}", $data);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'ingredient' => [
                'id',
                'name',
                'created_at',
                'updated_at',
            ]
        ]);
        $this->assertDatabaseHas('ingredients', ['name' => 'Updated Ingredient']);
    }

    public function test_destroy()
    {
        $user = User::factory()->create(['role' => 'admin']);        
        $this->actingAs($user, 'sanctum');
    
        $ingredient = Ingredient::factory()->create();
    
        $response = $this->delete("/api/v1/admin/ingredients/{$ingredient->id}");
    
        $response->assertStatus(200);
        $response->assertJson(['message' => 'Ingrédient supprimé avec succès']);
        $this->assertDatabaseMissing('ingredients', ['id' => $ingredient->id]);
    }

    public function test_destroy_not_found()
    {
        $user = User::factory()->create(['role' => 'admin']);        
        $this->actingAs($user, 'sanctum');
    
        $response = $this->delete('/api/v1/admin/ingredients/999');
    
        $response->assertStatus(404);
        $response->assertJson(['message' => 'Ingrédient non trouvé']);
    }
}