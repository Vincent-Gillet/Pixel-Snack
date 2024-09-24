<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Recipe;
use App\Models\Ingredient;

class IngredientsRecipesSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();

        $ingredients = Ingredient::all();

        $recipes = Recipe::all();

        $recipes->each(function ($recipe) use ($users, $ingredients) {
            if (!$recipe->user_id) {
                $recipe->user_id = $users->random()->id;
                $recipe->save();
            }

            $randomIngredients = $ingredients->random(rand(3, 7))->pluck('id');

            $attachData = $randomIngredients->mapWithKeys(function ($id) {
                return [
                    $id => [
                        'quantity' => rand(1, 1000),
                        'unit' => 'g', 
                    ],
                ];
            });

            $recipe->ingredients()->attach($attachData);
        });
    }
}