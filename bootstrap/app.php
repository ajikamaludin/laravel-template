<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

// check modules exists
$additionalWebRoutes = [];

if (file_exists(__DIR__ . '/../module/routes.php')) {
    $additionalWebRoutes = (require_once __DIR__ . '/../module/routes.php');
}

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: array_merge([
            __DIR__ . '/../routes/auth.php',
            __DIR__ . '/../routes/web.php',
        ], is_array($additionalWebRoutes) ? $additionalWebRoutes : []),
        api: __DIR__ . '/../routes/api.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })
    ->create();
