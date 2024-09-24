<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\IngredientController;

Route::group(['prefix' => 'v1'], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']); 
    Route::get('/recipes', [RecipeController::class, 'index'])->name('recipes.index');
    Route::get('/recipes/{id}', [RecipeController::class, 'show'])->name('recipes.show');
    Route::get('/recipes/filter/ingredient', [RecipeController::class, 'filterByIngredient'])->name('recipes.filterByIngredient');
    
    Route::get('/categories/{id}', [CategoryController::class, 'show'])->name('categories.show');
    Route::get('/recipes/{id}/categories', [RecipeController::class, 'show']);
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/categories/{id}/recipes', [CategoryController::class, 'recipesByCategory'])->name('categories.recipes');
    
    
    Route::get('/recipes/search', [RecipeController::class, 'search']);


    Route::get('/ingredients', [IngredientController::class, 'index'])->name('ingredients.index');

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
            Route::get('/', [AdminController::class, 'index'])->name('admin.index');
            Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
            Route::get('/users', [AdminController::class, 'listUsers'])->name('admin.users');
            Route::post('/create-user', [AdminController::class, 'createUser'])->name('admin.createUser');
            Route::delete('/delete-user/{id}', [AdminController::class, 'deleteUser'])->name('admin.deleteUser');
            Route::get('/users/{id}', [AdminController::class, 'showUser'])->name('users.showUser');
            Route::get('/recipes', [AdminController::class, 'showRecipes'])->name('admin.showRecipes');
            
            Route::get('/users', [UserController::class, 'index'])->name('users.index');
            Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
            Route::put('users/{id}', [UserController::class, 'update'])->name('users.update');
            Route::delete('/users/{id}', [UserController::class, 'delete'])->name('users.delete');


            Route::get('/categories/{id}', [CategoryController::class, 'show'])->name('categories.show');
            Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
            Route::put('/categories/{id}', [CategoryController::class, 'update'])->name('categories.update');
            Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');
        });

    });
});