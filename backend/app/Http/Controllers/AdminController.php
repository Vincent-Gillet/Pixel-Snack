<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Recipe;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{

    /**
     * @OA\Get(
     *     path="/api/v1/admin/users",
     *     summary="List all users",
     *     tags={"Admin"},
     *     @OA\Response(response=200, description="List of users")
     * )
     */

     public function listUsers(Request $request)
     {
         $users = User::all();
         return response()->json(['data' => $users]);
     }

    /**
     * @OA\Get(
     *     path="/api/v1/admin/users/{id}",
     *     summary="Show user details",
     *     tags={"Admin"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="User details"),
     *     @OA\Response(response=404, description="User not found")
     * )
     */

    public function showUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json(['user' => $user]);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/admin/recipes",
     *     summary="List all recipes",
     *     tags={"Admin"},
     *     @OA\Response(response=200, description="List of recipes")
     * )
     */

    public function showRecipes()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        if ($user->role === 'admin') {
            $recipes = Recipe::all();
        } else {
            $recipes = Recipe::where('user_id', $user->id)->get();
        }

        return response()->json(['recipes' => $recipes]);
    }

        /**
     * @OA\Post(
     *     path="/api/v1/admin/create-user",
     *     summary="Create a new user",
     *     tags={"Admin"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="password", type="string")
     *         )
     *     ),
     *     @OA\Response(response=201, description="User created successfully")
     * )
     */

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

    /**
     * @OA\Delete(
     *     path="/api/v1/admin/delete-user/{id}",
     *     summary="Delete a user",
     *     tags={"Admin"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="User deleted successfully"),
     *     @OA\Response(response=404, description="User not found")
     * )
     */

    public function deleteUser($token)
    {
        $user = User::findOrFail($token);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}