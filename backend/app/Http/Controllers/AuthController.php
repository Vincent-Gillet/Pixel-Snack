<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * @OA\Post(
     *     path="/register",
     *     summary="Register a new user",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","email","password","termsAccepted"},
     *             @OA\Property(property="name", type="string", example="John Doe"),
     *             @OA\Property(property="email", type="string", format="email", example="john.doe@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="password123"),
     *             @OA\Property(property="termsAccepted", type="boolean", example=true)
     *         ),
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="User created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="user", type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="John Doe"),
     *                 @OA\Property(property="email", type="string", example="john.doe@example.com"),
     *                 @OA\Property(property="termsAccepted", type="boolean", example=true),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2023-10-01T12:34:56.000000Z"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2023-10-01T12:34:56.000000Z")
     *             ),
     *             @OA\Property(property="token", type="string", example="1|abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation failed",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Validation failed"),
     *             @OA\Property(property="errors", type="object",
     *                 @OA\Property(property="name", type="array", @OA\Items(type="string", example="The name has already been taken.")),
     *                 @OA\Property(property="email", type="array", @OA\Items(type="string", example="The email has already been taken.")),
     *                 @OA\Property(property="termsAccepted", type="array", @OA\Items(type="string", example="The termsAccepted field is required."))
     *             )
     *         )
     *     )
     * )
     */

     public function register(Request $request)
     {
         try {
             $data = $request->validate([
                 'name' => 'required|string|unique:users,name',
                 'email' => 'required|string|email|unique:users,email',
                 'password' => 'required|string|min:8',
                 'termsAccepted' => 'required|boolean|accepted',
                ]);
 
             $user = User::create([
                 'name' => $data['name'],
                 'email' => $data['email'],
                 'password' => Hash::make($data['password']),
                 'termsAccepted' => $data['termsAccepted'],
                ]);
 
             $token = $user->createToken('auth_token')->plainTextToken;
 
             return response()->json([
                 'user' => $user,
                 'token' => $token,
             ], 201);
         } catch (ValidationException $e) {
             return response()->json([
                 'message' => 'Validation failed',
                 'errors' => $e->errors(),
             ], 422);
         } catch (\Exception $e) {
              return response()->json([
                 'message' => 'Registration failed',
                 'error' => $e->getMessage(),
             ], 500);
         }
     }

    /**
     * @OA\Post(
     *     path="/login",
     *     summary="Login a user",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","password"},
     *             @OA\Property(property="email", type="string", format="email", example="john.doe@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="password123"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User logged in successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="user", type="object", ref="#/components/schemas/User"),
     *             @OA\Property(property="accessToken", type="string", example="1|abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567abc890def123"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Invalid credentials",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Invalid credentials"),
     *         ),
     *     )
     * )
     */

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|exists:users',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $user->tokens()->where('name', 'Personal Access Token')->delete();
            $token = $user->createToken('Personal Access Token')->plainTextToken;
            return response()->json([
                'message' => 'Successfully logged in!',
                'accessToken' => $token,
                'user_id' => $user->id,
                'role' => $user->role
            ], 201);
        } else {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

        /**
     * @OA\Post(
     *     path="/logout",
     *     summary="Logout a user",
     *     tags={"Auth"},
     *     security={{"accessToken":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Successfully logged out",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Successfully logged out"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Unauthenticated"),
     *         ),
     *     )
     * )
     */

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
}