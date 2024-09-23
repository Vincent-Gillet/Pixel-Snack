<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class RecipeController extends Controller
{
    public function index(): JsonResponse
    {
        $recipes = Recipe::all();
        return response()->json($recipes);
    }

    public function show($id): JsonResponse
    {
        $recipe = Recipe::find($id);
        if (!$recipe) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }
        return response()->json(['recipe' => $recipe]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'video' => 'nullable|string',
            'ingredient' => 'nullable|string',
            'category_ids' => 'array', 
            'category_ids.*' => 'exists:categories,id', 
            'total_time' => 'nullable|integer',
            'preparation_time' => 'nullable|integer',
            'rest_time' => 'nullable|integer',
            'cooking_time' => 'nullable|integer',
            'title_reference' => 'nullable|string',
            'episode_reference' => 'nullable|string',
            'description_reference' => 'nullable|string',
            'logo_platform_reference' => 'nullable|string',
            'logo_platform_url_reference' => 'nullable|string',
            'image_repice_reference' => 'nullable|string',
            'user_id' => 'required|integer|exists:users,id',
        ]);

        $recipe = Recipe::create($data);
        if (isset($data['category_ids'])) {
            $recipe->categories()->sync($data['category_ids']);
        }
        return response()->json(['message' => 'Recipe created successfully', 'recipe' => $recipe], 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $recipe = Recipe::find($id);
        if (!$recipe) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'video' => 'nullable|string',
            'ingredient' => 'nullable|string',
            'category_ids' => 'array', 
            'category_ids.*' => 'exists:categories,id', 
            'total_time' => 'nullable|integer',
            'preparation_time' => 'nullable|integer',
            'rest_time' => 'nullable|integer',
            'cooking_time' => 'nullable|integer',
            'title_reference' => 'nullable|string',
            'episode_reference' => 'nullable|string',
            'description_reference' => 'nullable|string',
            'logo_platform_reference' => 'nullable|string',
            'logo_platform_url_reference' => 'nullable|string',
            'image_repice_reference' => 'nullable|string',
        ]);

        $recipe->update($data);
        if (isset($data['category_ids'])) {
            $recipe->categories()->sync($data['category_ids']);
        }
        return response()->json(['message' => 'Recipe updated successfully', 'recipe' => $recipe]);
    }

    public function destroy($id): JsonResponse
    {
        $recipe = Recipe::find($id);
        if (!$recipe) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }

        $recipe->delete();
        return response()->json(['message' => 'Recipe deleted successfully']);
    }

    public function search(Request $request): JsonResponse
    {
        $query = $request->input('query');

        if (!$query) {
            return response()->json(['message' => 'Query parameter is required'], 400);
        }

        $recipes = Recipe::where('title', 'LIKE', "%{$query}%")->get();

        if ($recipes->isEmpty()) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }

        return response()->json(['recipes' => $recipes], 200);
    }

}