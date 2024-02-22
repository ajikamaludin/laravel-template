<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;

class GeneralController extends Controller
{
    public function index()
    {
        return inertia('Dashboard', [
            'role_count' => Role::count(),
            'user_count' => User::count(),
        ]);
    }

    public function maintance()
    {
        return inertia('Maintance');
    }
}
