<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Recipe;
use App\Models\Ingredient;
use App\Models\Diet;
use Illuminate\Support\Facades\DB;

class RecipeSeeder extends Seeder
{
    public function run(): void
    {
        $filePath = database_path('seeders/recipes.json');
        $json = file_get_contents($filePath);
        $recipes = json_decode($json, true);

        DB::transaction(function () use ($recipes) {
            foreach ($recipes as $recipeData) {
                $recipe = Recipe::create([
                    'title' => $recipeData['title'],
                    'description' => $recipeData['description'],
                    'image' => $recipeData['image'],
                    'video' => $recipeData['video'],
                    'total_time' => $recipeData['total_time'],
                    'preparation_time' => $recipeData['preparation_time'],
                    'rest_time' => $recipeData['rest_time'],
                    'cooking_time' => $recipeData['cooking_time'],
                    'title_reference' => $recipeData['title_reference'],
                    'episode_reference' => $recipeData['episode_reference'],
                    'description_reference' => $recipeData['description_reference'],
                    'logo_platform_reference' => $recipeData['logo_platform_reference'],
                    'logo_platform_url_reference' => $recipeData['logo_platform_url_reference'],
                    'image_recipe_reference' => $recipeData['image_recipe_reference'],
                    'user_id' => $recipeData['user_id'],
                ]);

                foreach ($recipeData['ingredients'] as $ingredientData) {
                    $ingredient = Ingredient::find($ingredientData['id']);
                    if ($ingredient) {
                        $recipe->ingredients()->attach($ingredient->id, [
                            'quantity' => $ingredientData['quantity'],
                            'unit' => $ingredientData['unit']
                        ]);
                    }
                }

                foreach ($recipeData['diets'] as $dietData) {
                    $diet = Diet::find($dietData['id']);
                    if ($diet) {
                        $recipe->diets()->attach($diet->id);
                    }
                }
            }
        });
    }
}