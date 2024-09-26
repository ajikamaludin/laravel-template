<?php

namespace Module\CustomForm\Models;

use App\Models\Default\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Form extends Model
{
    protected $fillable = [
        'name',
        'fields',
        'user_id',
    ];

    public function records(): HasMany
    {
        return $this->hasMany(FormRecord::class);
    }
}
