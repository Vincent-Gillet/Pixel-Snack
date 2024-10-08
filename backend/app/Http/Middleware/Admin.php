<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Admin

{
    public function handle(Request $request, Closure $next)
    {
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        return $next($request);
    }
}