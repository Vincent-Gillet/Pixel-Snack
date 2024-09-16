<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

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

    public function listUsers()
    {
        $users = User::all();
        return response()->json($users);
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

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}