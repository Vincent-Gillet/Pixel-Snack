<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;
use App\Models\Ingredient;
use App\Models\Diet;
use Illuminate\Http\JsonResponse;

/**
 * @OA\Schema(
 *     schema="Recipe",
 *     type="object",
 *     title="Recipe",
 *     properties={
 *         @OA\Property(property="id", type="integer", example=1),
 *         @OA\Property(property="title", type="string", example="Spaghetti Bolognese"),
 *         @OA\Property(property="description", type="string", example="A classic Italian pasta dish"),
 *         @OA\Property(property="image", type="string", example="image_url"),
 *         @OA\Property(property="video", type="string", example="video_url"),
 *         @OA\Property(property="total_time", type="integer", example=45),
 *         @OA\Property(property="preparation_time", type="integer", example=15),
 *         @OA\Property(property="rest_time", type="integer", example=10),
 *         @OA\Property(property="cooking_time", type="integer", example=20),
 *         @OA\Property(property="title_reference", type="string", example="Reference Title"),
 *         @OA\Property(property="episode_reference", type="string", example="Episode 1"),
 *         @OA\Property(property="diets", type="array", @OA\Items(ref="#/components/schemas/Diet")),
 *         @OA\Property(property="ingredients", type="array", @OA\Items(ref="#/components/schemas/Ingredient")),
 *         @OA\Property(property="categories", type="array", @OA\Items(ref="#/components/schemas/Category")),
 *         @OA\Property(property="created_at", type="string", format="date-time", example="2024-09-27T18:41:01.000000Z"),
 *         @OA\Property(property="updated_at", type="string", format="date-time", example="2024-09-27T18:41:01.000000Z"),
 *     }
 * )
 */


class RecipeController extends Controller
{

    /**
     * @OA\Get(
     *     path="/recipes",
     *     summary="Get all recipes",
     *     tags={"Recipes"},
     *     @OA\Response(
     *         response=200,
     *         description="A list of recipes",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Recipe")
     *         )
     *     )
     * )
     */
    public function index(): JsonResponse
    {
        $recipes = Recipe::all();
        return response()->json($recipes);
    }

    /**
     * @OA\Get(
     *     path="/recipes/{id}",
     *     summary="Get a recipe by ID",
     *     tags={"Recipes"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="A single recipe",
     *         @OA\JsonContent(ref="#/components/schemas/Recipe")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Recipe not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Recipe not found")
     *         )
     *     )
     * )
     */
    public function show($id): JsonResponse
    {
        $recipe = Recipe::with(['ingredients', 'diets', 'categories', 'user'])->find($id);
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
                'id' => $diet->id,
                'name' => $diet->name,
            ];
        });
    
        $categories = $recipe->categories->map(function ($category) {
            return [
                'id' => $category->id,
                'title' => $category->title,
                'image' => $category->image,
            ];
        });
    
        return response()->json([
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
            'image_recipe_reference' => $recipe->image_recipe_reference,
            'user' => [
                'id' => $recipe->user->id,
                'name' => $recipe->user->name,
            ],
            'ingredients' => $ingredients,
            'diets' => $diets,
            'categories' => $categories,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/recipes",
     *     summary="Create a new recipe",
     *     tags={"Recipes"},
     *     security={{"accessToken":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title"},
     *             @OA\Property(property="title", type="string", example="Spaghetti Bolognese"),
     *             @OA\Property(property="description", type="string", example="A classic Italian pasta dish"),
     *             @OA\Property(property="image", type="string", example="image_url"),
     *             @OA\Property(property="video", type="string", example="video_url"),
     *             @OA\Property(property="total_time", type="integer", example=45),
     *             @OA\Property(property="preparation_time", type="integer", example=15),
     *             @OA\Property(property="rest_time", type="integer", example=10),
     *             @OA\Property(property="cooking_time", type="integer", example=20),
     *             @OA\Property(property="title_reference", type="string", example="Reference Title"),
     *             @OA\Property(property="episode_reference", type="string", example="Episode 1"),
     *             @OA\Property(property="description_reference", type="string", example="Description of the reference"),
     *             @OA\Property(property="logo_platform_reference", type="string", example="https://example.com/logo.png"),
     *             @OA\Property(property="logo_platform_url_reference", type="string", example="https://example.com"),
     *             @OA\Property(property="image_recipe_reference", type="string", example="https://example.com/image.jpg"),
     *             @OA\Property(property="ingredients", type="array", @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="quantity", type="string", example="2"),
     *                 @OA\Property(property="unit", type="string", example="pieces")
     *             )),
     *             @OA\Property(property="diets", type="array", @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1)
     *             )),
     *             @OA\Property(property="categories", type="array", @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1)
     *             ))
     *         ),
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Recipe created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Recipe")
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
                'image_recipe_reference' => 'nullable|string',
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

    /**
     * @OA\Put(
     *     path="/recipes/{id}",
     *     summary="Update a recipe",
     *     tags={"Recipes"},
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
     *             required={"title"},
     *             @OA\Property(property="title", type="string", example="Spaghetti Bolognese"),
     *             @OA\Property(property="description", type="string", example="A classic Italian pasta dish"),
     *             @OA\Property(property="image", type="string", example="image_url"),
     *             @OA\Property(property="video", type="string", example="video_url"),
     *             @OA\Property(property="total_time", type="integer", example=45),
     *             @OA\Property(property="preparation_time", type="integer", example=15),
     *             @OA\Property(property="rest_time", type="integer", example=10),
     *             @OA\Property(property="cooking_time", type="integer", example=20),
     *             @OA\Property(property="title_reference", type="string", example="Reference Title"),
     *             @OA\Property(property="episode_reference", type="string", example="Episode 1"),
     *             @OA\Property(property="description_reference", type="string", example="Description of the reference"),
     *             @OA\Property(property="logo_platform_reference", type="string", example="https://example.com/logo.png"),
     *             @OA\Property(property="logo_platform_url_reference", type="string", example="https://example.com"),
     *             @OA\Property(property="image_recipe_reference", type="string", example="https://example.com/image.jpg"),
     *             @OA\Property(property="ingredients", type="array", @OA\Items(ref="#/components/schemas/Ingredient")),
     *             @OA\Property(property="diets", type="array", @OA\Items(ref="#/components/schemas/Diet")),
     *             @OA\Property(property="categories", type="array", @OA\Items(ref="#/components/schemas/Category")),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Recipe updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Recipe")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Recipe not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Recipe not found")
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
            'ingredients' => 'array',
            'ingredients.*.id' => 'exists:ingredients,id',
            'ingredients.*.quantity' => 'nullable|numeric',
            'ingredients.*.unit' => 'nullable|string',
            'diets' => 'array',
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
                        'quantity' => $ingredient['quantity'],
                        'unit' => $ingredient['unit'],
                    ],
                ];
            })->toArray();
            $recipe->ingredients()->sync($ingredientsData);
        }
    
        if (isset($data['diets'])) {
            $recipe->diets()->sync(collect($data['diets'])->pluck('id')->toArray());
        }
    
        return response()->json(['message' => 'Recipe updated successfully', 'recipe' => $recipe], 200);
    }
    
    /**
     * @OA\Delete(
     *     path="/recipes/{id}",
     *     summary="Delete a recipe",
     *     tags={"Recipes"},
     *     security={{"accessToken":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Recipe deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Recipe deleted successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Recipe not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Recipe not found")
     *         )
     *     )
     * )
     */

    public function destroy($id): JsonResponse
    {
        $recipe = Recipe::find($id);
        if (!$recipe) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }

        $recipe->delete();
        return response()->json(['message' => 'Recipe deleted successfully']);
    }

    /**
     * @OA\Get(
     *     path="/recipes/filter",
     *     summary="Filter recipes",
     *     tags={"Recipes"},
     *     @OA\Parameter(
     *         name="title",
     *         in="query",
     *         required=false,
     *         @OA\Schema(type="string"),
     *         description="Filter by recipe title"
     *     ),
     *     @OA\Parameter(
     *         name="category_id",
     *         in="query",
     *         required=false,
     *         @OA\Schema(type="integer"),
     *         description="Filter by category ID"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Filtered list of recipes",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Recipe")
     *         )
     *     )
     * )
     */

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
            $recipeQuery->where(function($query) use ($title) {
                $query->where('title', 'LIKE', "%{$title}%")
                      ->orWhere('title_reference', 'LIKE', "%{$title}%")
                      ->orWhere('description_reference', 'LIKE', "%{$title}%");
            });
        }

        $recipes = $recipeQuery->get();

        if ($recipes->isEmpty()) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }

        return response()->json(['recipes' => $recipes], 200);
    }
}
