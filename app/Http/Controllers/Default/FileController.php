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
        $path = Storage::disk('public')->path($name);

        if (Storage::disk('default')->exists($name)) {
            $path = Storage::disk('default')->path($name);

            return response()->download($path, $name);
        }

        $file = File::where('hash_name', $name)->first();

        return response()->download($path, $file?->upload_name);
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

        // the `/` its mean that in disk public it will store in root folder
        Storage::disk('public')->put('/', $file);

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
