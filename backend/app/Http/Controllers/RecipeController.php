<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;
use App\Models\Ingredient;
use App\Models\Diet;
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
        $recipe = Recipe::with(['ingredients', 'diets'])->find($id);
        if (!$recipe) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }
    
        $ingredients = $recipe->ingredients->map(function ($ingredient) {
            return [
                'id' => $ingredient->id,
                'name' => $ingredient->name,
                'quantity' => $ingredient->pivot->quantity,
                'unit' => $ingredient->pivot->unit,
            ];
        });
    
        $diets = $recipe->diets->map(function ($diet) {
            return [
                'name' => $diet->name,
            ];
        });
    
        return response()->json([
            'recipe' => [
                'id' => $recipe->id,
                'title' => $recipe->title,
                'description' => $recipe->description,
                'image' => $recipe->image,
                'video' => $recipe->video,
                'total_time' => $recipe->total_time,
                'preparation_time' => $recipe->preparation_time,
                'rest_time' => $recipe->rest_time,
                'cooking_time' => $recipe->cooking_time,
                'title_reference' => $recipe->title_reference,
                'episode_reference' => $recipe->episode_reference,
                'description_reference' => $recipe->description_reference,
                'logo_platform_reference' => $recipe->logo_platform_reference,
                'logo_platform_url_reference' => $recipe->logo_platform_url_reference,
                'image_repice_reference' => $recipe->image_repice_reference,
                'created_at' => $recipe->created_at,
                'updated_at' => $recipe->updated_at,
                'user_id' => $recipe->user_id,
                'ingredients' => $ingredients,
                'diets' => $diets,
            ]
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        try {
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
                'ingredients.*.quantity' => 'nullable|numeric',
                'ingredients.*.unit' => 'nullable|string',
                'diets' => 'array',
                'diets.*.id' => 'exists:diets,id',
            ]);
    
            $data['user_id'] = $request->user()->id;
    
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
    
            if (isset($data['diets'])) {
                $recipe->diets()->sync(collect($data['diets'])->pluck('id')->toArray());
            }
    
            return response()->json(['message' => 'Recipe created successfully', 'recipe' => $recipe], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Internal Server Error', 'error' => $e->getMessage()], 500);
        }
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
            'ingredients' => 'nullable|array',
            'ingredients.*.id' => 'exists:ingredients,id',
            'ingredients.*.quantity' => 'nullable|numeric',
            'ingredients.*.unit' => 'nullable|string',
            'diets' => 'nullable|array',
            'diets.*.id' => 'exists:diets,id',
        ]);
    
        $recipe->update($data);
    
        if (isset($data['category_ids'])) {
            $recipe->categories()->sync($data['category_ids']);
        }
    
        if (isset($data['ingredients'])) {
            $ingredientsData = collect($data['ingredients'])->mapWithKeys(function ($ingredient) {
                return [
                    $ingredient['id'] => [
                        'quantity' => $ingredient['quantity'] !== null ? $ingredient['quantity'] : null,
                        'unit' => $ingredient['unit'] !== null ? $ingredient['unit'] : null,
                    ],
                ];
            });
    
            $recipe->ingredients()->sync($ingredientsData);
        }
    
        if (isset($data['diets'])) {
            $dietIds = collect($data['diets'])->pluck('id')->toArray();
            $recipe->diets()->sync($dietIds);
        }
    
        $recipe->load('ingredients', 'diets');
    
        return response()->json([
            'message' => 'Recipe updated successfully',
            'recipe' => [
                'id' => $recipe->id,
                'title' => $recipe->title,
                'description' => $recipe->description,
                'image' => $recipe->image,
                'video' => $recipe->video,
                'total_time' => $recipe->total_time,
                'preparation_time' => $recipe->preparation_time,
                'rest_time' => $recipe->rest_time,
                'cooking_time' => $recipe->cooking_time,
                'title_reference' => $recipe->title_reference,
                'episode_reference' => $recipe->episode_reference,
                'description_reference' => $recipe->description_reference,
                'logo_platform_reference' => $recipe->logo_platform_reference,
                'logo_platform_url_reference' => $recipe->logo_platform_url_reference,
                'image_repice_reference' => $recipe->image_repice_reference,
                'created_at' => $recipe->created_at,
                'updated_at' => $recipe->updated_at,
                'user_id' => $recipe->user_id,
                'ingredients' => $recipe->ingredients,
                'diets' => $recipe->diets,
            ]
        ]);
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

    public function filter(Request $request)
    {
        $ingredient = $request->query('ingredient');
        $diet = $request->query('diet');
        $title = $request->query('title');

        $recipeQuery = Recipe::query();

        if ($ingredient) {
            $recipeQuery->whereHas('ingredients', function ($q) use ($ingredient) {
                $q->where('name', $ingredient);
            });
        }

        if ($diet) {
            $recipeQuery->whereHas('diets', function ($q) use ($diet) {
                $q->where('name', $diet);
            });
        }

        if ($title) {
            $recipeQuery->where('title', 'LIKE', "%{$title}%");
        }

        $recipes = $recipeQuery->get();

        if ($recipes->isEmpty()) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }

        return response()->json(['recipes' => $recipes], 200);
    }
}
