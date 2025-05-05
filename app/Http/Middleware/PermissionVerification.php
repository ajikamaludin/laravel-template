<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

class PermissionVerification
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $controllerAction = Route::currentRouteAction();
        [$controller, $method] = explode('@', $controllerAction);

        $reflection = new \ReflectionMethod($controller, $method);
        $attributes = $reflection->getAttributes(\App\Attributes\Permission::class);

        if (!empty($attributes)) {
            $permissions = $attributes[0]->newInstance()->permissions;
            $allows = [];
            foreach ($permissions as $permission) {
                $allows[] = $request->user()->allow($permission);
            }

            // any allows not true abort
            if (!in_array(true, $allows)) {
                abort(403);
            }
        }

        return $next($request);
    }
}
