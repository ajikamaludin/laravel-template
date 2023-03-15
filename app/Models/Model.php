<?php

namespace App\Models;

use App\Models\Traits\CascadeSoftDeletes;
use App\Models\Traits\UserTrackable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as BaseModel;
use Illuminate\Database\Eloquent\SoftDeletes;

class Model extends BaseModel
{
    use HasFactory, HasUuids, UserTrackable, SoftDeletes, CascadeSoftDeletes;

    public $cascadeDeletes = [];
}
