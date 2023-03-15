<?php

namespace App\Http\Controllers;

class GeneralController extends Controller
{
    public function index()
    {
        return inertia('Dashboard');
    }

    public function maintance()
    {
        return inertia('Maintance');
    }
}
