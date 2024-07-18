<?php

namespace App\Modules\CustomForm\Models;

use App\Models\Default\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Form extends Model
{
    protected $fillable = [
        'name',
        'fields',
    ];

    public function records(): HasMany
    {
        return $this->hasMany(FormRecord::class);
    }
}
