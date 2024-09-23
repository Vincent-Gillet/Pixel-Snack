<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Recipe;

class CategoriesRecipesSeeder extends Seeder
{

    public function run(): void
    {

        $categories = Category::all();
        $recipes = Recipe::all();

        $recipes->each(function ($recipe) use ($categories) {

            $availableCategoriesCount = $categories->count();

            if ($availableCategoriesCount < 1) {
                return;
            }

            $categoriesToAttach = $categories->random(rand(1, min(3, $availableCategoriesCount)))->pluck('id')->toArray();
            $recipe->categories()->attach($categoriesToAttach);
        });
    }
}