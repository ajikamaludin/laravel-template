<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Casts\Attribute;

trait HasFile
{
    const FILE_FIELD_PLACEHOLDER = 'file_field';

    public function fileUrl(): Attribute
    {
        return Attribute::make(get: fn() => $this->{self::FILE_FIELD_PLACEHOLDER} != '' ? route('file.show', ['file' => $this->{self::FILE_FIELD_PLACEHOLDER}]) : null);
    }
}
