<?php

use Module\Shortlink\Controllers\HomeController;
use Module\Shortlink\Controllers\LinkController;
use Illuminate\Support\Facades\Route;

Route::prefix('shortlink')
    ->name('shortlink.')
    ->group(function () {
        Route::middleware(['auth'])->group(function () {
            Route::get('/links', [LinkController::class, 'index'])->name('link.index');
            Route::post('/links', [LinkController::class, 'store'])->name('link.store');
            Route::get('/links/{link}', [LinkController::class, 'show'])->name('link.show');
            Route::put('/links/{link}', [LinkController::class, 'update'])->name('link.update');
            Route::delete('/links/{link}', [LinkController::class, 'destroy'])->name('link.destroy');
        });

        Route::get('/', [HomeController::class, 'index'])->name('home');
        Route::post('/', [HomeController::class, 'store']);
        Route::get('/{link:code}', [HomeController::class, 'redirect'])->name('redirect');
    });
