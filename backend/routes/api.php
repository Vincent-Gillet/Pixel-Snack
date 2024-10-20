<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\DietController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\ContactController;

Route::group(['prefix' => 'v1'], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']); 

    Route::get('/recipes', [RecipeController::class, 'index'])->name('recipes.index');
    Route::get('/recipes/{id}', [RecipeController::class, 'show'])->name('recipes.show');
    Route::get('/recipes/filter/recipes', [RecipeController::class, 'getFilter']);
    Route::get('/recipes/{id}/categories', [RecipeController::class, 'show']);

    Route::get('/categories/{id}', [CategoryController::class, 'show'])->name('categories.show');
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/categories/{id}/recipes', [CategoryController::class, 'getRecipesByCategoryId'])->name('categories.recipes');

    Route::get('/ingredients', [IngredientController::class, 'index'])->name('ingredients.index');

    Route::get('/diets', [DietController::class, 'index']);
    Route::get('/diets/{id}', [DietController::class, 'show']);

    Route::post('/newsletter/subscribe', [NewsletterController::class, 'getSubcribe'])->name('newsletter.subscribe');
    
    Route::post('/send-email', [ContactController::class, 'getSendEmail']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);

        Route::get('/user', [UserController::class, 'show'])->name('users.show');
        Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::put('users/{id}', [UserController::class, 'update'])->name('users.update');
        Route::delete('/users/{id}', [UserController::class, 'delete'])->name('users.delete');
        Route::get('/my-recipes', [UserController::class, 'getUserRecipes'])->name('recipes.getUserRecipes');

        Route::post('/recipes', [RecipeController::class, 'store'])->name('recipes.store');
        Route::put('/recipes/{id}', [RecipeController::class, 'update'])->name('recipes.update');
        Route::delete('/recipes/{id}', [RecipeController::class, 'destroy'])->name('recipes.destroy');

        Route::group(['prefix' => 'admin', 'middleware' => ['auth:sanctum', 'admin']], function () {
            Route::get('/users', [AdminController::class, 'listUsers'])->name('admin.users');
            Route::post('/create-user', [AdminController::class, 'createUser'])->name('admin.createUser');
            Route::delete('/delete-user/{id}', [AdminController::class, 'deleteUser'])->name('admin.deleteUser');
            Route::get('/users/{id}', [AdminController::class, 'showUser'])->name('admin.users.showUser');
            Route::get('/recipes', [AdminController::class, 'showRecipes'])->name('admin.showRecipes');
            
            Route::get('/users', [UserController::class, 'index'])->name('admin.users.index');
            Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('admin.users.edit');
            Route::put('users/{id}', [UserController::class, 'update'])->name('admin.users.update');
            Route::delete('/users/{id}', [UserController::class, 'delete'])->name('admin.users.delete');

            Route::get('/categories/{id}', [CategoryController::class, 'show'])->name('admin.categories.show');
            Route::post('/categories', [CategoryController::class, 'store'])->name('admin.categories.store');
            Route::put('/categories/{id}', [CategoryController::class, 'update'])->name('admin.categories.update');
            Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->name('admin.categories.destroy');

            Route::get('/ingredients/{id}', [IngredientController::class, 'show'])->name('ingredients.show');
            Route::post('/ingredients', [IngredientController::class, 'store'])->name('ingredients.store');
            Route::put('/ingredients/{id}', [IngredientController::class, 'update'])->name('ingredients.update');
            Route::delete('/ingredients/{id}', [IngredientController::class, 'destroy'])->name('ingredients.destroy');

            Route::post('/diets', [DietController::class, 'store'])->name('diets.store');
            Route::put('/diets/{id}', [DietController::class, 'update'])->name('diets.update');
            Route::delete('/diets/{id}', [DietController::class, 'destroy'])->name('diets.destroy');

            Route::get('/newsletter/subscribers', [NewsletterController::class, 'index'])->name('newsletter.index');
        });
    });
});