<?php

namespace App\Http\Controllers\Default;

use App\Http\Controllers\Controller;
use App\Models\Default\Role;
use App\Models\Default\User;
use Illuminate\Http\Request;


class GeneralController extends Controller
{
    public function index(Request $request)
    {
        return inertia('dashboard', [
            'user_count' => User::count(),
            'role_count' => Role::count()
        ]);
    }

    public function maintance()
    {
        return inertia('maintance');
    }
}
