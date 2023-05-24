<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = [
            ['id' => Str::ulid(), 'label' => 'View Dashboard', 'name' => 'view-dashboard'],

            ['id' => Str::ulid(), 'label' => 'Create User', 'name' => 'create-user'],
            ['id' => Str::ulid(), 'label' => 'Update User', 'name' => 'update-user'],
            ['id' => Str::ulid(), 'label' => 'View User', 'name' => 'view-user'],
            ['id' => Str::ulid(), 'label' => 'Delete User', 'name' => 'delete-user'],

            ['id' => Str::ulid(), 'label' => 'Create Role', 'name' => 'create-role'],
            ['id' => Str::ulid(), 'label' => 'Update Role', 'name' => 'update-role'],
            ['id' => Str::ulid(), 'label' => 'View Role', 'name' => 'view-role'],
            ['id' => Str::ulid(), 'label' => 'Delete Role', 'name' => 'delete-role'],
        ];

        foreach ($permissions as $permission) {
            Permission::insert($permission);
        }

        $role = Role::create(['name' => 'admin']);

        $permissions = Permission::all();
        foreach ($permissions as $permission) {
            $role->rolePermissions()->create(['permission_id' => $permission->id]);
        }

        User::create([
            'name' => 'Super Administrator',
            'email' => 'root@admin.com',
            'password' => bcrypt('password'),
        ]);

        $admin = User::create([
            'name' => 'Administator',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
            'role_id' => $role->id,
        ]);

        $setting = [];

        Setting::insert($setting);
    }
}
