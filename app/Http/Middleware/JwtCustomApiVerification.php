<?php

namespace App\Http\Middleware;

use App\Services\UserJwtService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class JwtCustomApiVerification
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        UserJwtService::validateToken($request->header('Authorization'));

        return $next($request);
    }
}
