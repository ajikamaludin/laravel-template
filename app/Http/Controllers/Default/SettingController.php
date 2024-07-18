<?php

namespace App\Http\Controllers\Default;

use App\Http\Controllers\Controller;
use App\Models\Default\Setting;
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
            'app_logo' => 'nullable|string',
        ]);

        DB::beginTransaction();

        foreach ($request->input() as $key => $value) {
            if ($value === null) {
                continue;
            }
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
            ->with('message', ['type' => 'success', 'message' => 'Setting created']);
    }
}
