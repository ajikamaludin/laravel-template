<?php

namespace App\Http\Controllers\Default;

use App\Http\Controllers\Controller;
use App\Models\Default\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\File as FileRule;

class FileController extends Controller
{
    public function show(string $name)
    {
        $path = Storage::disk('local')->path('public/' . $name);

        if (Storage::disk('local')->exists('default/' . $name)) {
            $path = Storage::disk('local')->path('default/' . $name);
        }

        return response()->download($path);
    }

    public function store(Request $request)
    {
        $rule = ['required', 'file', 'max:4192'];
        if ($request->filemimes != '') {
            $rule[] = FileRule::types($request->filemimes);
        }

        $request->validate([
            'file' => $rule,
        ]);

        $file = $request->file('file');

        Storage::disk('local')->put('public', $file);

        File::create([
            'upload_name' => $file->getClientOriginalName(),
            'hash_name' => $file->hashName(),
            'name' => $file->getClientOriginalName(),
            'type' => File::FILE,
        ]);

        return response()->json([
            'id' => Str::ulid(),
            'name_original' => $file->getClientOriginalName(),
            'name' => $file->hashName(),
            'url' => route('file.show', ['file' => $file->hashName()]),
        ]);
    }
}
