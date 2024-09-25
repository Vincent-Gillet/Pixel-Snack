<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DietsRecipesSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(DietSeeder::class);

        $diets = DB::table('diets')->pluck('id')->toArray();

        $recipes = DB::table('recipes')->pluck('id')->toArray();

        foreach ($recipes as $recipeId) {
            DB::table('diet_recipe')->insert([
                'diet_id' => $diets[array_rand($diets)],
                'recipe_id' => $recipeId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}