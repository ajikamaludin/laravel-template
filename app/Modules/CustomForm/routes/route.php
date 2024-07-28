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
            Route::get('{form}/form-records/export', [FormRecordController::class, 'export'])->name('form-records.export');
            Route::resource('{form}/form-records', FormRecordController::class)->parameters(['form-records' => 'formRecord']);
            Route::resource('forms', FormController::class);
        });
    });
