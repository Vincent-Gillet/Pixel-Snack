<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DietSeeder extends Seeder
{
    public function run(): void
    {
        $diets = [
            ['name' => 'Végétarien', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Carnivore', 'created_at' => now(), 'updated_at' => now()],
        ];

        foreach ($diets as $diet) {
            DB::table('diets')->updateOrInsert(
                ['name' => $diet['name']],
                $diet
            );
        }
    }
}