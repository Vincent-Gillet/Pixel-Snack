<?php

namespace App\Http\Controllers;

use App\Models\Diet;
use Illuminate\Http\Request;

class DietController extends Controller
{
    public function index()
    {
        $diets = Diet::all();
        return response()->json(['diets' => $diets], 200);
    }

    public function show($id)
    {
        $diet = Diet::find($id);

        if (!$diet) {
            return response()->json(['message' => 'Régime non trouvé'], 404);
        }

        return response()->json(['diet' => $diet], 200);
    }

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