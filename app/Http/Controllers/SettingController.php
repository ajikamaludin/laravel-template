<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SettingController extends Controller
{
    public function index()
    {
        return inertia('Setting/Index', [
            'setting' => Setting::all(),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'app_name' => 'required|string',
        ]);

        DB::beginTransaction();

        foreach ($request->input() as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                [
                    'value' => $value,
                    'type' => 'text',
                ]
            );
        }

        DB::commit();

        return redirect()->route('setting.index')
            ->with('message', ['type' => 'success', 'message' => 'Setting saved']);
    }
}
