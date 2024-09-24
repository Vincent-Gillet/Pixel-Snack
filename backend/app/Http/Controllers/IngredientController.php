<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    public function index()
    {
        $ingredients = Ingredient::all();
        return response()->json(['ingredients' => $ingredients], 200);
    }

    public function show($id)
    {
        $ingredient = Ingredient::find($id);

        if (!$ingredient) {
            return response()->json(['message' => 'Ingrédient non trouvé'], 404);
        }

        return response()->json(['ingredient' => $ingredient], 200);
    }

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