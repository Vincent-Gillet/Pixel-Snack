<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Recipe;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class UserControllerUnitTest extends TestCase
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

    public function test_index()
    {
        // Créer des utilisateurs
        User::factory()->count(3)->create();

        // Appeler la méthode du contrôleur
        $controller = new UserController();
        $response = $controller->index();

        // Assertions
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertCount(3, $response->getData()->data);
    }

    public function test_show_authenticated_user()
    {
        $user = User::factory()->create();
        Auth::shouldReceive('user')->andReturn($user);

        $controller = new UserController();
        $response = $controller->show();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals($user->id, $response->getData()->user->id);
    }

    public function test_show_user_not_found()
    {
        Auth::shouldReceive('user')->andReturn(null);

        $controller = new UserController();
        $response = $controller->show();

        $this->assertEquals(404, $response->getStatusCode());
        $this->assertEquals('User not found', $response->getData()->message);
    }

    public function test_edit_user()
    {
        $user = User::factory()->create();

        $controller = new UserController();
        $response = $controller->edit($user->id);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals($user->id, $response->getData()->user->id);
    }

    public function test_edit_user_not_found()
    {
        $controller = new UserController();
        $response = $controller->edit(999);

        $this->assertEquals(404, $response->getStatusCode());
        $this->assertEquals('User not found', $response->getData()->message);
    }

    public function test_update_user()
    {
        $user = User::factory()->create();

        $request = Request::create('/users/' . $user->id, 'PUT', [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
            'role' => 'user',
        ]);

        Auth::shouldReceive('user')->andReturn($user);

        $controller = new UserController();
        $response = $controller->update($request, $user->id);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('Updated Name', $response->getData()->user->name);
        $this->assertTrue(Hash::check('newpassword123', $user->fresh()->password));
    }

    public function test_update_user_with_empty_fields()
    {
        $user = User::factory()->create();
    
        $request = Request::create('/users/' . $user->id, 'PUT', [
            'name' => '',
            'email' => '',
            'password' => '',
            'password_confirmation' => '',
            'role' => '',
        ]);
    
        Auth::shouldReceive('user')->andReturn($user);
    
        $controller = new UserController();
    
        try {
            $response = $controller->update($request, $user->id);
        } catch (ValidationException $e) {
            $errors = $e->errors();
            $this->assertArrayHasKey('name', $errors);
            $this->assertArrayHasKey('email', $errors);
            $this->assertArrayHasKey('role', $errors);
            return;
        }
    
        $this->fail('Expected ValidationException was not thrown.');
    }

    public function test_update_user_with_special_characters()
    {
        $user = User::factory()->create();

        $request = Request::create('/users/' . $user->id, 'PUT', [
            'name' => 'Updated Name!@#$%^&*()',
            'email' => 'updated+special@example.com',
            'password' => 'newpassword123!@#$',
            'password_confirmation' => 'newpassword123!@#$',
            'role' => 'user',
        ]);

        Auth::shouldReceive('user')->andReturn($user);

        $controller = new UserController();
        $response = $controller->update($request, $user->id);

        $updatedUser = $user->fresh();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('Updated Name!@#$%^&*()', $updatedUser->name);
        $this->assertEquals('updated+special@example.com', $updatedUser->email);
        $this->assertTrue(Hash::check('newpassword123!@#$', $updatedUser->password));
        $this->assertEquals('user', $updatedUser->role);
    }

    public function test_update_user_not_found()
    {
        $request = Request::create('/users/999', 'PUT', [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
            'role' => 'user',
        ]);

        $controller = new UserController();
        $response = $controller->update($request, 999);

        $this->assertEquals(404, $response->getStatusCode());
        $this->assertEquals('User not found', $response->getData()->message);
    }

    public function test_delete_user()
    {
        $user = User::factory()->create();

        $controller = new UserController();
        $response = $controller->delete($user->id);

        $this->assertEquals(204, $response->getStatusCode());
        $this->assertNull(User::find($user->id));
    }

    public function test_delete_user_not_found()
    {
        $controller = new UserController();
        $response = $controller->delete(999);

        $this->assertEquals(404, $response->getStatusCode());
        $this->assertEquals('User not found', $response->getData()->message);
    }

    public function test_get_user_recipes()
    {
        $user = User::factory()->create();
        Auth::shouldReceive('user')->andReturn($user);

        $recipes = Recipe::factory()->count(3)->create(['user_id' => $user->id]);

        $controller = new UserController();
        $response = $controller->getUserRecipes();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertCount(3, $response->getData()->recipes);
    }

    public function test_get_user_recipes_not_authenticated()
    {
        Auth::shouldReceive('user')->andReturn(null);

        $controller = new UserController();
        $response = $controller->getUserRecipes();

        $this->assertEquals(401, $response->getStatusCode());
        $this->assertEquals('User not authenticated', $response->getData()->message);
    }
}