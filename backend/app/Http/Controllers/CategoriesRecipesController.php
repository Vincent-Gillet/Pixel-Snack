<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Recipe;
use Illuminate\Http\JsonResponse;

class CategoriesRecipesController extends Controller
{
    public function attachCategoryToRecipe(Request $request, $recipeId): JsonResponse
    {
        $data = $request->validate([
            'category_id' => 'required|exists:categories,id',
        ]);

        $recipe = Recipe::find($recipeId);
        if (!$recipe) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }

        $recipe->categories()->attach($data['category_id']);
        return response()->json(['message' => 'Category attached to recipe successfully']);
    }

    public function detachCategoryFromRecipe(Request $request, $recipeId): JsonResponse
    {
        $data = $request->validate([
            'category_id' => 'required|exists:categories,id',
        ]);

        $recipe = Recipe::find($recipeId);
        if (!$recipe) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }

        $recipe->categories()->detach($data['category_id']);
        return response()->json(['message' => 'Category detached from recipe successfully']);
    }

    public function syncCategoriesWithRecipe(Request $request, $recipeId): JsonResponse
    {
        $data = $request->validate([
            'category_ids' => 'array',
            'category_ids.*' => 'exists:categories,id',
        ]);

        $recipe = Recipe::find($recipeId);
        if (!$recipe) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }

        $recipe->categories()->sync($data['category_ids']);
        return response()->json(['message' => 'Categories synced with recipe successfully']);
    }
}