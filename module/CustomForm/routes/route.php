<?php

use Module\CustomForm\Controllers\FormController;
use Module\CustomForm\Controllers\FormRecordController;
use Illuminate\Support\Facades\Route;

Route::prefix('custom-form')
    ->name('custom-form.')
    ->group(function () {
        Route::get('/public/{form}', [FormRecordController::class, 'open'])->name('public');
        Route::post('/public/{form}', [FormRecordController::class, 'store']);

        Route::middleware(['auth:web'])->group(function () {
            Route::get('{form}/form-records/print', [FormRecordController::class, 'print'])->name('form-records.print');
            Route::get('{form}/form-records/export', [FormRecordController::class, 'export'])->name('form-records.export');
            Route::resource('{form}/form-records', FormRecordController::class)->parameters(['form-records' => 'formRecord']);
            Route::resource('forms', FormController::class);
        });
    });
