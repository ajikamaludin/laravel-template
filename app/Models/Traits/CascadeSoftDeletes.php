<?php

namespace App\Models\Traits;

trait CascadeSoftDeletes
{
    protected static function bootCascadeSoftDeletes()
    {
        static::deleting(function ($resource) {
            foreach ($resource->cascadeDeletes as $relation) {
                $resource->{$relation}()->delete();
            }
        });

        static::restoring(function ($resource) {
            foreach ($resource->cascadeDeletes as $relation) {
                $resource->{$relation}()->withTrashed()->restore();
            }
        });
    }
}
