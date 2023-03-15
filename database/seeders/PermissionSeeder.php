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
            ['id' => Str::uuid(), 'label' => 'View Dashboard', 'name' => 'view-dashboard'],

            ['id' => Str::uuid(), 'label' => 'Create User', 'name' => 'create-user'],
            ['id' => Str::uuid(), 'label' => 'Update User', 'name' => 'update-user'],
            ['id' => Str::uuid(), 'label' => 'View User', 'name' => 'view-user'],
            ['id' => Str::uuid(), 'label' => 'Delete User', 'name' => 'delete-user'],

            ['id' => Str::uuid(), 'label' => 'Create Role', 'name' => 'create-role'],
            ['id' => Str::uuid(), 'label' => 'Update Role', 'name' => 'update-role'],
            ['id' => Str::uuid(), 'label' => 'View Role', 'name' => 'view-role'],
            ['id' => Str::uuid(), 'label' => 'Delete Role', 'name' => 'delete-role'],
        ];

        foreach($permissions as $permission) {
            Permission::insert($permission);
        }

        $role = Role::create(['name' => 'admin']);

        $permissions = Permission::all();
        foreach($permissions as $permission) {
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

        $setting = [
        ];

        Setting::insert($setting);
    }
}
