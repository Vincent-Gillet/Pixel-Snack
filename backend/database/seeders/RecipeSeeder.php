<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Recipe;
use App\Models\User;

class RecipeSeeder extends Seeder
{
    public function run(): void
    {
        $userIds = User::pluck('id')->toArray();

        Recipe::factory()->count(50)->create([
            'user_id' => function () use ($userIds) {
                return $userIds[array_rand($userIds)];
            }
        ]);
    }
}