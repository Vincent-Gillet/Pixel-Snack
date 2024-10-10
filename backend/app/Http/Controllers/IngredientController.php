<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

/**
 * @OA\Schema(
 *     schema="Ingredient",
 *     type="object",
 *     title="Ingredient",
 *     properties={
 *         @OA\Property(property="id", type="integer", example=1),
 *         @OA\Property(property="name", type="string", example="Pomme"),
 *         @OA\Property(property="quantity", type="string", example="2"),
 *         @OA\Property(property="unit", type="string", example="pieces"),
 *     }
 * )
 */

class IngredientController extends Controller
{
    /**
     * @OA\Get(
     *     path="/ingredients",
     *     summary="Get all ingredients",
     *     tags={"Ingredients"},
     *     @OA\Response(
     *         response=200,
     *         description="Ingredients retrieved successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="ingredients", type="array", @OA\Items(ref="#/components/schemas/Ingredient"))
     *         )
     *     )
     * )
     */

    public function index()
    {
        $ingredients = Ingredient::all();
        return response()->json(['ingredients' => $ingredients], 200);
    }

    /**
     * @OA\Get(
     *     path="/ingredients/{id}",
     *     summary="Get an ingredient by ID",
     *     tags={"Ingredients"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Ingredient retrieved successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="ingredient", ref="#/components/schemas/Ingredient")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Ingredient not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Ingredient not found")
     *         )
     *     )
     * )
     */

    public function show($id)
    {
        $ingredient = Ingredient::find($id);

        if (!$ingredient) {
            return response()->json(['message' => 'Ingrédient non trouvé'], 404);
        }

        return response()->json(['ingredient' => $ingredient], 200);
    }

    /**
     * @OA\Post(
     *     path="/admin/ingredients",
     *     summary="Create a new ingredient",
     *     tags={"Ingredients"},
     *     security={{"accessToken":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="Tomato")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Ingredient created successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="ingredient", ref="#/components/schemas/Ingredient")
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

        $ingredient = new Ingredient();
        $ingredient->name = $request->name;
        $ingredient->save();

        return response()->json(['ingredient' => $ingredient], 201);
    }

        /**
     * @OA\Put(
     *     path="/admin/ingredients/{id}",
     *     summary="Update an ingredient",
     *     tags={"Ingredients"},
     *     security={{"bearerAuth":{}}},
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
     *             @OA\Property(property="name", type="string", example="Tomato")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Ingredient updated successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="ingredient", ref="#/components/schemas/Ingredient")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Ingredient not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Ingredient not found")
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
        $ingredient = Ingredient::find($id);

        if (!$ingredient) {
            return response()->json(['message' => 'Ingrédient non trouvé'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $ingredient->name = $request->name;
        $ingredient->save();

        return response()->json(['ingredient' => $ingredient], 200);
    }

    /**
     * @OA\Delete(
     *     path="/admin/ingredients/{id}",
     *     summary="Delete an ingredient",
     *     tags={"Ingredients"},
     *     security={{"accessToken":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Ingredient deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Ingredient deleted successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Ingredient not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Ingredient not found")
     *         )
     *     )
     * )
     */

    public function destroy($id)
    {
        $ingredient = Ingredient::find($id);

        if (!$ingredient) {
            return response()->json(['message' => 'Ingrédient non trouvé'], 404);
        }

        $ingredient->delete();

        return response()->json(['message' => 'Ingrédient supprimé avec succès'], 200);
    }
}