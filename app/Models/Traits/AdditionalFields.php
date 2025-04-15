<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Casts\Attribute;

trait AdditionalFields
{
    const ADDITIONAL_FIELD = '_fields';

    protected $appends = ['fields'];

    public function fields(): Attribute
    {
        return Attribute::make(get: fn() =>  json_decode($this->{self::ADDITIONAL_FIELD} != null ? $this->{self::ADDITIONAL_FIELD} : '[]'));
    }
}
