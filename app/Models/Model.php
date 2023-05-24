<?php

namespace App\Models;

use App\Models\Traits\CascadeSoftDeletes;
use App\Models\Traits\UserTrackable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as BaseModel;
use Illuminate\Database\Eloquent\SoftDeletes;

class Model extends BaseModel
{
    use HasFactory, HasUlids, UserTrackable, SoftDeletes, CascadeSoftDeletes;

    public $cascadeDeletes = [];
}
