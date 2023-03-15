<?php

namespace App\Models\Traits;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

/**
 * Auto track the user who did an action
 *
 * track who created an item, or edit, or delete,
 * by specifying following constants that corresponds to respective table fields
 *
 * CREATED_BY
 * PDATED_BY
 * DELETED_BY
 */
trait UserTrackable
{
    public static function bootUserTrackable()
    {
        static::creating(function ($model) {
            if (Auth::check()) {
                $model->created_by = Auth::id();
            }
        });

        static::updating(function ($model) {
            if (Auth::check()) {
                $model->updated_by = Auth::id();
            }
        });

        static::deleting(function ($model) {
            if (Auth::check()) {
                $model->deleted_by = Auth::id();

                // for delete, need to update the model manually
                $model->save();
            }
        });
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function editor()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function deleter()
    {
        return $this->belongsTo(User::class, 'deleted_by');
    }
}
