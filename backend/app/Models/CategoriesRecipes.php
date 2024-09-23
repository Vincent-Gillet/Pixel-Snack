<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\Recipe;

class CategoriesRecipes extends Model
{
    use HasFactory;

    public function category()
    {
        return $this->hasMany(Category::class, 'category');
    }

    public function recipe()
    {
        return $this->belongsToMany(Recipe::class, 'recipe');
    }
}
