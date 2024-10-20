<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Category;
use App\Models\Recipe;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CategoryControllerFunctionalTest extends TestCase
{
    use RefreshDatabase;

    public function test_index()
    {
        Category::factory()->count(3)->create();

        $response = $this->get('/api/v1/categories');

        $response->assertStatus(200);
        $response->assertJsonCount(3, 'categories');
    }

    public function test_show()
    {
        $category = Category::factory()->create();

        $response = $this->get("/api/v1/categories/{$category->id}");

        $response->assertStatus(200);
        $response->assertJson(['category' => $category->toArray()]);
    }

    public function test_show_not_found()
    {
        $response = $this->get('/api/v1/categories/999');

        $response->assertStatus(404);
        $response->assertJson(['message' => 'Category not found']);
    }

    public function test_store()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($user, 'sanctum');

        $data = [
            'title' => 'New Category',
            'image' => 'https://example.com/image.jpg',
        ];

        $response = $this->withExceptionHandling()->post('/api/v1/admin/categories', $data);

        $response->assertStatus(201);
        $response->assertJson(['category' => ['title' => 'New Category']]);
        $this->assertDatabaseHas('categories', ['title' => 'New Category']);
    }

    public function test_update()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($user, 'sanctum');

        $category = Category::factory()->create();

        $data = [
            'title' => 'Updated Category',
            'image' => 'https://example.com/updated-image.jpg',
        ];

        $response = $this->withExceptionHandling()->put("/api/v1/admin/categories/{$category->id}", $data);

        $response->assertStatus(200);
        $response->assertJson(['category' => ['title' => 'Updated Category']]);
        $this->assertDatabaseHas('categories', ['title' => 'Updated Category']);
    }

    public function test_update_not_found()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($user, 'sanctum');

        $data = [
            'title' => 'Updated Category',
            'image' => 'https://example.com/updated-image.jpg',
        ];

        $response = $this->withExceptionHandling()->put('/api/v1/admin/categories/999', $data);

        $response->assertStatus(404);
        $response->assertJson(['message' => 'Category not found']);
    }

    public function test_destroy()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($user, 'sanctum');

        $category = Category::factory()->create();

        $response = $this->withExceptionHandling()->delete("/api/v1/admin/categories/{$category->id}");

        $response->assertStatus(200);
        $response->assertJson(['message' => 'Category deleted successfully']);
        $this->assertDatabaseMissing('categories', ['id' => $category->id]);
    }

    public function test_destroy_not_found()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($user, 'sanctum');

        $response = $this->withExceptionHandling()->delete('/api/v1/admin/categories/999');

        $response->assertStatus(404);
        $response->assertJson(['message' => 'Category not found']);
    }

    public function test_recipes_by_category()
    {
        $user = User::factory()->create(); // Crée un utilisateur
        $category = Category::factory()->create();
        $recipe = Recipe::factory()->create(['user_id' => $user->id]); // Associe l'utilisateur à la recette
        $category->recipes()->attach($recipe);

        $response = $this->get("/api/v1/categories/{$category->id}/recipes");

        $response->assertStatus(200);
        $response->assertJsonFragment(['id' => $recipe->id]);
    }

    public function test_recipes_by_category_not_found()
    {
        $response = $this->get('/api/v1/categories/999/recipes');

        $response->assertStatus(404);
        $response->assertJson(['message' => 'Category not found']);
    }
}
