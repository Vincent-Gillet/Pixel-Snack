<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;
use App\Models\Ingredient;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class RecipeController extends Controller
{
    public function index(): JsonResponse
    {
        $recipes = Recipe::all();
        return response()->json($recipes);
    }

    public function show($id): JsonResponse
    {
        $recipe = Recipe::with('ingredients')->find($id);
        if (!$recipe) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }

        $ingredients = $recipe->ingredients->map(function ($ingredient) {
            return [
                'name' => $ingredient->name,
                'quantity' => $ingredient->pivot->quantity,
                'unit' => $ingredient->pivot->unit,
            ];
        });

        return response()->json(['recipe' => $recipe, 'ingredients' => $ingredients]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'video' => 'nullable|string',
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
            'ingredients' => 'array',
            'ingredients.*.id' => 'exists:ingredients,id',
            'ingredients.*.quantity' => 'required_with:ingredients.*.id|numeric',
            'ingredients.*.unit' => 'required_with:ingredients.*.id|string',
        ]);

        $recipe = Recipe::create($data);
        if (isset($data['category_ids'])) {
            $recipe->categories()->sync($data['category_ids']);
        }

        if (isset($data['ingredients'])) {
            $ingredientsData = collect($data['ingredients'])->mapWithKeys(function ($ingredient) {
                return [
                    $ingredient['id'] => [
                        'quantity' => $ingredient['quantity'],
                        'unit' => $ingredient['unit'],
                    ],
                ];
            });

            $recipe->ingredients()->attach($ingredientsData);
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
            'ingredients' => 'array',
            'ingredients.*.id' => 'exists:ingredients,id',
            'ingredients.*.quantity' => 'required_with:ingredients.*.id|numeric',
            'ingredients.*.unit' => 'required_with:ingredients.*.id|string',
        ]);

        $recipe->update($data);

        if (isset($data['category_ids'])) {
            $recipe->categories()->sync($data['category_ids']);
        }

        if (isset($data['ingredients'])) {
            $ingredientsData = collect($data['ingredients'])->mapWithKeys(function ($ingredient) {
                return [
                    $ingredient['id'] => [
                        'quantity' => $ingredient['quantity'],
                        'unit' => $ingredient['unit'],
                    ],
                ];
            });

            $recipe->ingredients()->sync($ingredientsData);
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


    public function filterByIngredient(Request $request): JsonResponse
    {
        $ingredient = $request->query('ingredient');
    
        if (!$ingredient) {
            return response()->json(['message' => 'Ingrédient non spécifié'], 400);
        }
    
        $ingredientModel = Ingredient::where('name', 'LIKE', '%' . $ingredient . '%')->first();
    
        if (!$ingredientModel) {
            return response()->json(['message' => 'Ingrédient non trouvé'], 404);
        }
    
        $recipes = $ingredientModel->recipes;
    
        if ($recipes->isEmpty()) {
            return response()->json(['message' => 'Aucune recette trouvée'], 404);
        }
    
        return response()->json(['recipes' => $recipes], 200);
    }
}
