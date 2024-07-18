<?php

use App\Modules\CustomForm\Controllers\FormController;
use App\Modules\CustomForm\Controllers\FormRecordController;
use Illuminate\Support\Facades\Route;

Route::prefix('custom-form')
    ->name('custom-form.')
    ->group(function () {
        Route::resource('{form}/form-records', FormRecordController::class)->parameters(['form-records' => 'formRecord']);
        Route::resource('forms', FormController::class);
    });
