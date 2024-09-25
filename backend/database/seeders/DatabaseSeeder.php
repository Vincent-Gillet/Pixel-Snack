<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(UserSeeder::class);

        $this->call([
            RecipeSeeder::class,
            CategorySeeder::class,
            CategoriesRecipesSeeder::class,
            IngredientSeeder::class,
            IngredientsRecipesSeeder::class,
            DietSeeder::class,
            DietsRecipesSeeder::class,
        ]);
    }
}