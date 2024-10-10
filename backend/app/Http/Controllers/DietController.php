<?php

namespace App\Http\Controllers;

use App\Models\Diet;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

/**
 * @OA\Schema(
 *     schema="Diet",
 *     type="object",
 *     title="Diet",
 *     properties={
 *         @OA\Property(property="id", type="integer", example=1),
 *         @OA\Property(property="name", type="string", example="Vegetarian"),
 *         @OA\Property(property="created_at", type="string", format="date-time", example="2024-09-27T18:41:01.000000Z"),
 *         @OA\Property(property="updated_at", type="string", format="date-time", example="2024-09-27T18:41:01.000000Z"),
 *     }
 * )
 */

class DietController extends Controller
{
    /**
     * @OA\Get(
     *     path="/diets",
     *     summary="Get all diets",
     *     tags={"Diets"},
     *     @OA\Response(
     *         response=200,
     *         description="Diets retrieved successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="diets", type="array", @OA\Items(ref="#/components/schemas/Diet"))
     *         )
     *     )
     * )
     */

    public function index()
    {
        $diets = Diet::all();
        return response()->json(['diets' => $diets], 200);
    }

        /**
     * @OA\Get(
     *     path="/diets/{id}",
     *     summary="Get a diet by ID",
     *     tags={"Diets"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Diet retrieved successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="diet", ref="#/components/schemas/Diet")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Diet not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Régime non trouvé")
     *         )
     *     )
     * )
     */

    public function show($id)
    {
        $diet = Diet::find($id);

        if (!$diet) {
            return response()->json(['message' => 'Régime non trouvé'], 404);
        }

        return response()->json(['diet' => $diet], 200);
    }

    /**
     * @OA\Post(
     *     path="/diets",
     *     summary="Create a new diet",
     *     tags={"Diets"},
     *     security={{"accessToken":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="Vegetarian")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Diet created successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="diet", ref="#/components/schemas/Diet")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad request",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Validation error")
     *         )
     *     )
     * )
     */

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $diet = new Diet();
        $diet->name = $request->name;
        $diet->save();

        return response()->json(['diet' => $diet], 201);
    }

        /**
     * @OA\Put(
     *     path="/admin/diets/{id}",
     *     summary="Update a diet",
     *     tags={"Diets"},
     *     security={{"accessToken":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="Vegetarian")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Diet updated successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="diet", ref="#/components/schemas/Diet")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Diet not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Régime non trouvé")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad request",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Validation error")
     *         )
     *     )
     * )
     */
    public function update(Request $request, $id): JsonResponse
    {
        $diet = Diet::find($id);

        if (!$diet) {
            return response()->json(['message' => 'Régime non trouvé'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $diet->name = $request->name;
        $diet->save();

        return response()->json(['diet' => $diet], 200);
    }

    /**
     * @OA\Delete(
     *     path="/admin/diets/{id}",
     *     summary="Delete a diet",
     *     tags={"Diets"},
     *     security={{"accessToken":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Diet deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Régime supprimé avec succès")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Diet not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Régime non trouvé")
     *         )
     *     )
     * )
     */

    public function destroy($id)
    {
        $diet = Diet::find($id);

        if (!$diet) {
            return response()->json(['message' => 'Régime non trouvé'], 404);
        }

        $diet->delete();

        return response()->json(['message' => 'Régime supprimé avec succès'], 200);
    }
}