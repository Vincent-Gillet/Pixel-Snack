<?php

namespace Database\Factories;

use App\Models\Diet;
use Illuminate\Database\Eloquent\Factories\Factory;

class DietFactory extends Factory
{
    protected $model = Diet::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
        ];
    }
}