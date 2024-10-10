<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CorsMiddleware; 

Route::middleware([CorsMiddleware::class])->group(function () {
    Route::get('/', function () {
        return view('welcome');
    });

});