<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Casts\Attribute;

trait HasFile
{
    const FILE_FIELD = 'file';

    public function file_url(): Attribute
    {
        return Attribute::make(get: fn () => $this->{self::FILE_FIELD} != '' ? route('file.show', ['file' => $this->{self::FILE_FIELD}]) : null);
    }
}
