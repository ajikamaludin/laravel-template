<?php

namespace Module\Internal\Services;

use App\Constants\PermissionConstant;
use App\Models\Default\Permission;
use App\Models\Default\Role;
use Illuminate\Support\Str;

class PermissionService
{
    public static function new()
    {
        return new PermissionService;
    }

    public function sync()
    {
        $defaultPermissions = PermissionConstant::all();
        $lists = collect($defaultPermissions)->map(fn($permission) => $permission['name'])->toArray();
        $permissions = Permission::all()->pluck('name')->toArray();

        // remove existing permission in database
        $to_delete = array_diff($permissions, $lists);
        foreach ($to_delete as $name) {
            Permission::where('name', $name)->delete();
        }

        $adminRole = Role::where('name', 'admin')->first();
        // add new permission to database
        $to_add = array_diff($lists, $permissions);
        foreach ($to_add as $index => $name) {
            $np = Permission::create(['id' => Str::ulid(), ...$defaultPermissions[$index]]);
            if ($adminRole != null) {
                $adminRole->rolePermissions()->create(['permission_id' => $np->id]);
            }
        }

        return [$to_add, $to_delete];
    }
}
