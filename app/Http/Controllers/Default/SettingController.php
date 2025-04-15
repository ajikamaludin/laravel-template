<?php

namespace App\Http\Controllers\Default;

use App\Http\Controllers\Controller;
use App\Models\Default\Setting;
use App\Services\RecentActivityService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SettingController extends Controller
{
    public function index()
    {
        return inertia('setting/index', [
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

        foreach ($request->except(['app_logo', 'invoice_watermark']) as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value ?? ''],
            );
        }

        foreach ($request->only(['app_logo', 'invoice_watermark']) as $key => $value) {
            if ($value != '') {
                Setting::updateOrCreate(
                    ['key' => $key],
                    ['value' => $value ?? ''],
                );
            }
        }

        DB::commit();

        return redirect()->route('setting.index')
            ->with('message', ['type' => 'success', 'message' => 'Setting created']);
    }
}
