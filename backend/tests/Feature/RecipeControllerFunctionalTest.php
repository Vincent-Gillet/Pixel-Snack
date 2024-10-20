<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Recipe;
use App\Models\Ingredient;
use App\Models\Diet;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RecipeControllerFunctionalTest extends TestCase
{
    use RefreshDatabase;

    public function test_search_by_ingredient()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $ingredient = Ingredient::factory()->create(['name' => 'Tomato']);
        $recipe = Recipe::factory()->create(['user_id' => $user->id]);
        $recipe->ingredients()->attach($ingredient);

        $response = $this->get('/api/v1/recipes?ingredient=Tomato');

        $response->assertStatus(200);
        $response->assertJsonFragment(['id' => $recipe->id]);
    }

    public function test_search_by_diet()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $diet = Diet::factory()->create(['name' => 'Vegetarian']);
        $recipe = Recipe::factory()->create(['user_id' => $user->id]);
        $recipe->diets()->attach($diet);

        $response = $this->get('/api/v1/recipes?diet=Vegetarian');

        $response->assertStatus(200);
        $response->assertJsonFragment(['id' => $recipe->id]);
    }

    public function test_search_by_title()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $recipe = Recipe::factory()->create(['title' => 'Delicious Pancakes', 'user_id' => $user->id]);

        $response = $this->get('/api/v1/recipes?title=Delicious');

        $response->assertStatus(200);
        $response->assertJsonFragment(['id' => $recipe->id]);
    }

    public function test_search_by_title_reference()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $recipe = Recipe::factory()->create(['title_reference' => 'Pancake Recipe', 'user_id' => $user->id]);

        $response = $this->get('/api/v1/recipes?title_reference=Pancake');

        $response->assertStatus(200);
        $response->assertJsonFragment(['id' => $recipe->id]);
    }

    public function test_search_with_no_results()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        Recipe::factory()->create(['title' => 'Spaghetti Bolognese', 'user_id' => $user->id]);

        $response = $this->get('/api/v1/recipes/filter/recipes?title=NonExistentRecipe');

        $response->assertStatus(404);
        $response->assertJsonMissingExact(['title' => 'Spaghetti Bolognese']);
    }
}
