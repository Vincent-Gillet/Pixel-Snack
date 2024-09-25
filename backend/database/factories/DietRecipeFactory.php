<?php

namespace Database\Factories;

use App\Models\Diet;
use App\Models\Recipe;
use Illuminate\Database\Eloquent\Factories\Factory;

class DietRecipeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'diet_id' => Diet::factory(),
            'recipe_id' => Recipe::factory(),
        ];
    }
}