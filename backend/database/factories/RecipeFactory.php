<?php

namespace Database\Factories;

use App\Models\Recipe;
use Illuminate\Database\Eloquent\Factories\Factory;

class RecipeFactory extends Factory
{
    protected $model = Recipe::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'image' => $this->faker->imageUrl,
            'video' => $this->faker->url,
            'total_time' => $this->faker->numberBetween(10, 120),
            'preparation_time' => $this->faker->numberBetween(5, 60),
            'rest_time' => $this->faker->numberBetween(0, 60),
            'cooking_time' => $this->faker->numberBetween(5, 60),
            'title_reference' => $this->faker->sentence,
            'episode_reference' => $this->faker->sentence,
            'description_reference' => $this->faker->paragraph,
            'logo_platform_reference' => $this->faker->imageUrl,
            'logo_platform_url_reference' => $this->faker->url,
            'image_repice_reference' => $this->faker->imageUrl,
            'user_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}