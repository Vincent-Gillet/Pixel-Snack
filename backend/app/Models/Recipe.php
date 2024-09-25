<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image',
        'video',
        'total_time',
        'preparation_time',
        'rest_time',
        'cooking_time',
        'title_reference',
        'episode_reference',
        'description_reference',
        'logo_platform_reference',
        'logo_platform_url_reference',
        'image_repice_reference',
        'user_id',
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'categories_recipes');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, 'ingredient_recipe')
                    ->withPivot('quantity', 'unit')
                    ->withTimestamps();
    }

    public function diets()
    {
        return $this->belongsToMany(Diet::class);
    }
}