<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;

class AuthControllerUnitTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate');
    }

    protected function tearDown(): void
    {
        parent::tearDown();
    }

    public function test_login_success()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password')
        ]);

        $response = $this->postJson('/api/v1/login', [
            'email' => 'test@example.com',
            'password' => 'password'
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure(['accessToken']);
        $this->assertNotEmpty($response->json('accessToken'));
    }

    public function test_login_failure()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password')
        ]);

        $response = $this->postJson('/api/v1/login', [
            'email' => 'test@example.com',
            'password' => 'wrongpassword'
        ]);

        $response->assertStatus(401);
        $response->assertJson(['message' => 'Invalid credentials']);
    }

    public function test_register_success()
    {
        $response = $this->postJson('/api/v1/register', [
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'termsAccepted' => true
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure(['user', 'token']);
        $this->assertNotEmpty($response->json('token'));
    }

    public function test_register_validation_failure()
    {
        $admin = User::factory()->create(['role' => 'admin']);
    
        $this->actingAs($admin, 'api');
    
        User::factory()->create([
            'email' => 'john.doe@example.com'
        ]);
    
        $response = $this->postJson('/api/v1/register', [
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'termsAccepted' => true
        ]);
    
        $response->assertStatus(422);
        $response->assertJsonStructure(['message', 'errors']);
        $response->assertJsonFragment(['errors' => ['email' => ['validation.unique']]]);
    }

    public function test_logout_success()
    {
        $user = User::factory()->create();
    
        $token = $user->createToken('Personal Access Token')->plainTextToken;
        $this->withHeader('Authorization', 'Bearer ' . $token);
    
        $response = $this->postJson('/api/v1/logout');
    
        $response->assertStatus(200);
        $response->assertJson(['message' => 'Successfully logged out']);
    }
}