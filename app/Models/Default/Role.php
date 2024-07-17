<?php

namespace App\Models\Default;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Role extends Model
{
    const GUEST = 'guest';

    public $cascadeDeletes = ['rolePermissions', 'users'];

    protected $fillable = [
        'name',
    ];

    public function rolePermissions(): HasMany
    {
        return $this->hasMany(RolePermission::class);
    }

    public function permissions(): HasManyThrough
    {
        return $this->hasManyThrough(
            Permission::class,
            RolePermission::class,
            'role_id',
            'id',
            'id',
            'permission_id',
        );
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
