<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 * @OA\Info(
 *     title="API Documentation",
 *     version="1.0.0"
 * )
 * @OA\SecurityScheme(
 *     securityScheme="accessToken",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 */

 class SwaggerController extends Controller
{
    //
}
