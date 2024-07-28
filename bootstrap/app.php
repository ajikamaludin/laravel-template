<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

// check modules exists
$additionalWebRoutes = [];
if (file_exists(__DIR__ . '/../app/Modules/routes.php')) {
    $additionalWebRoutes = (require_once __DIR__ . '/../app/Modules/routes.php');
}

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: [
            ...$additionalWebRoutes,
            __DIR__ . '/../routes/auth.php',
            __DIR__ . '/../routes/web.php',
        ],
        api: __DIR__ . '/../routes/api.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HttpSecureAware::class,
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })
    ->withCommands(file_exists(__DIR__ . '/../app/Internal/Commands') ? [__DIR__ . '/../app/Internal/Commands'] : [])
    ->create();
