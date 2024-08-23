<?php

use App\Modules\CustomForm\Controllers\FormController;
use App\Modules\CustomForm\Controllers\FormRecordController;
use Illuminate\Support\Facades\Route;

Route::prefix('custom-form')
    ->name('custom-form.')
    ->group(function () {
        Route::get('/public/{form}', [FormRecordController::class, 'open'])->name('public');
        Route::post('/public/{form}', [FormRecordController::class, 'store']);

        Route::middleware(['auth'])->group(function () {
            Route::get('{form}/form-records/print', [FormRecordController::class, 'print'])->name('form-records.print');
            Route::get('{form}/form-records/export', [FormRecordController::class, 'export'])->name('form-records.export');
            Route::resource('{form}/form-records', FormRecordController::class)->parameters(['form-records' => 'formRecord']);
            Route::resource('forms', FormController::class);
        });
    });

use App\Modules\Shortlink\Controllers\HomeController;
use App\Modules\Shortlink\Controllers\LinkController;

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
