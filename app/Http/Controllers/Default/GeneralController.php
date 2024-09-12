<?php

namespace App\Http\Controllers\Default;

use App\Http\Controllers\Controller;
use App\Models\Default\Role;
use App\Models\Default\User;
use Illuminate\Support\Facades\Concurrency;

class GeneralController extends Controller
{
    public function index()
    {
        [$role_count, $user_count] = Concurrency::run([
            fn() => Role::count(),
            fn() => User::count(),
        ]);

        return inertia('Dashboard', [
            'role_count' => $role_count,
            'user_count' => $user_count,
        ]);
    }

    public function maintance()
    {
        return inertia('Maintance');
    }
}
