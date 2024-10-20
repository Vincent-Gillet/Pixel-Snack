<?php

namespace Tests\Unit;

use App\Http\Controllers\CategoryController;
use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Tests\TestCase;

class CategoryControllerUnitTest extends TestCase
{
    use RefreshDatabase;

    protected $categoryController;

    protected function setUp(): void
    {
        parent::setUp();
        $this->categoryController = new CategoryController();
    }

    public function test_index_returns_all_categories()
    {
        // Créer des catégories
        Category::factory()->count(3)->create();

        $response = $this->categoryController->index();

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getContent(), true);
        $this->assertCount(3, $data['categories']);
    }

    public function test_store_creates_a_new_category()
    {
        $data = [
            'title' => 'New Category',
            'image' => 'https://example.com/image.jpg',
        ];

        $request = new Request($data);
        $response = $this->categoryController->store($request);

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(201, $response->getStatusCode());

        $data = json_decode($response->getContent(), true);
        $this->assertEquals('Category created successfully', $data['message']);
        $this->assertDatabaseHas('categories', [
            'title' => 'New Category',
            'image' => 'https://example.com/image.jpg',
        ]);
    }

    public function test_show_returns_category_by_id()
    {
        $category = Category::factory()->create();

        $response = $this->categoryController->show($category->id);

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getContent(), true);
        $this->assertEquals($category->id, $data['category']['id']);
        $this->assertEquals($category->title, $data['category']['title']);
    }

    public function test_update_category()
    {
        $category = Category::factory()->create();

        $data = [
            'title' => 'Updated Category',
            'image' => 'https://example.com/image-updated.jpg',
        ];

        $request = new Request($data);
        $response = $this->categoryController->update($request, $category->id);

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getContent(), true);
        $this->assertEquals('Category updated successfully', $data['message']);
        $this->assertDatabaseHas('categories', [
            'id' => $category->id,
            'title' => 'Updated Category',
            'image' => 'https://example.com/image-updated.jpg',
        ]);
    }

    public function test_destroy_deletes_a_category()
    {
        $category = Category::factory()->create();

        $response = $this->categoryController->destroy($category->id);

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('Category deleted successfully', json_decode($response->getContent())->message);
        $this->assertDatabaseMissing('categories', ['id' => $category->id]);
    }

    public function test_get_recipes_by_category_id()
    {
        $category = Category::factory()->create();
        $user = User::factory()->create(); // Assurez-vous d'avoir un utilisateur
        $category->recipes()->create(['title' => 'Recipe 1', 'user_id' => $user->id]);
        $category->recipes()->create(['title' => 'Recipe 2', 'user_id' => $user->id]);

        $response = $this->categoryController->getRecipesByCategoryId($category->id);

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getContent(), true);
        $this->assertCount(2, $data);
    }

    public function test_show_non_existent_category()
    {
        $response = $this->categoryController->show(999); // ID qui n'existe pas

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(404, $response->getStatusCode());
        $this->assertEquals('Category not found', json_decode($response->getContent())->message);
    }

    public function test_update_non_existent_category()
    {
        $data = [
            'title' => 'Updated Category',
            'image' => 'https://example.com/image-updated.jpg',
        ];

        $request = new Request($data);
        $response = $this->categoryController->update($request, 999); // ID qui n'existe pas

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(404, $response->getStatusCode());
        $this->assertEquals('Category not found', json_decode($response->getContent())->message);
    }

    public function test_destroy_non_existent_category()
    {
        $response = $this->categoryController->destroy(999); // ID qui n'existe pas

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(404, $response->getStatusCode());
        $this->assertEquals('Category not found', json_decode($response->getContent())->message);
    }
}
