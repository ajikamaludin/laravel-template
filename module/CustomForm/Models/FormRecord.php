<?php

namespace Module\CustomForm\Models;

use App\Models\Default\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FormRecord extends Model
{
    protected $fillable = [
        'form_id',
        'fields',
    ];

    public function form(): BelongsTo
    {
        return $this->belongsTo(Form::class);
    }
}
