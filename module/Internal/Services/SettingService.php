<?php

namespace Module\Internal\Services;

use App\Constants\SettingConstant;
use App\Models\Default\Setting;
use Illuminate\Support\Str;

class SettingService
{
    public static function new()
    {
        return new SettingService;
    }

    public function sync()
    {
        $IndexedSetting = SettingConstant::all();
        $lists = collect($IndexedSetting)->map(fn($setting) => $setting['key'])->toArray();
        $settings = Setting::all()->pluck('key')->toArray();

        // remove existing setting in database
        $to_delete = array_diff($settings, $lists);
        foreach ($to_delete as $key) {
            Setting::where('key', $key)->delete();
        }

        // add new setting to database
        $to_add = array_diff($lists, $settings);
        foreach ($to_add as $index => $key) {
            Setting::create(['id' => Str::ulid(), ...$IndexedSetting[$index]]);
        }

        return [$to_add, $to_delete];
    }
}
