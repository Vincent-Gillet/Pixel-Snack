<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Recipe;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AdminController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Welcome to the admin panel']);
    }

    public function dashboard()
    {
        return response()->json(['message' => 'Admin dashboard']);
    }

    public function listUsers(Request $request)
    {
        $users = User::paginate(10);
        return response()->json($users);
    }


    public function showUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json(['user' => $user]);
    }

    public function showRecipes()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        Log::info('User:', ['user' => $user]);
        Log::info('User Role:', ['role' => $user->role]);

        if ($user->role === 'admin') {
            $recipes = Recipe::all();
        } else {
            $recipes = Recipe::where('user_id', $user->id)->get();
        }

        return response()->json(['recipes' => $recipes]);
    }


    public function createUser(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
    }

    public function deleteUser($token)
    {
        $user = User::findOrFail($token);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}