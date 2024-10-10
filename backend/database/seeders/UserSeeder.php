<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => Hash::make('password'),
                'termsAccepted' => true, 
            ]
        );

        User::factory()->create([
            'name' => 'John',
            'email' => 'john@gmail.com',
            'termsAccepted' => true,
        ]);
    }
}