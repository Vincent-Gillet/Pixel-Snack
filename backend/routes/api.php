<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;

Route::group(['prefix' => 'v1'], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']); 

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);

        // Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');
        Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::put('users/{id}', [UserController::class, 'update'])->name('users.update');
        Route::delete('/users/{id}', [UserController::class, 'delete'])->name('users.delete');
   
        Route::group(['prefix' => 'admin', 'middleware' => 'auth:sanctum'], function () {
            Route::get('/', [AdminController::class, 'index'])->name('admin.index');
            Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
            Route::get('/users', [AdminController::class, 'listUsers'])->name('admin.users');
            Route::post('/create-user', [AdminController::class, 'createUser'])->name('admin.createUser');
            Route::delete('/delete-user/{id}', [AdminController::class, 'deleteUser'])->name('admin.deleteUser');

            Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');
            Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
            Route::put('users/{id}', [UserController::class, 'update'])->name('users.update');
            Route::delete('/users/{id}', [UserController::class, 'delete'])->name('users.delete');
        });

    });
});