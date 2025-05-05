<?php

namespace App\Constants;

use Illuminate\Support\Facades\Route;

class PermissionConstant
{
    const LIST = [
        ['label' => 'View Dashboard', 'name' => 'view-dashboard', 'group' => 'General'],

        ['label' => 'Create User', 'name' => 'create-user', 'group' => 'Users'],
        ['label' => 'Update User', 'name' => 'update-user', 'group' => 'Users'],
        ['label' => 'View User', 'name' => 'view-user', 'group' => 'Users'],
        ['label' => 'Delete User', 'name' => 'delete-user', 'group' => 'Users'],

        ['label' => 'Create Role', 'name' => 'create-role', 'group' => 'Users'],
        ['label' => 'Update Role', 'name' => 'update-role', 'group' => 'Users'],
        ['label' => 'View Role', 'name' => 'view-role', 'group' => 'Users'],
        ['label' => 'Delete Role', 'name' => 'delete-role', 'group' => 'Users'],

        ['label' => 'View Setting', 'name' => 'view-setting', 'group' => 'Sertting'],
        ['label' => 'Update Setting', 'name' => 'update-setting', 'group' => 'Setting'],

        // #Add New Permission Below!


    ];

    public static function all()
    {
        return array_merge(self::LIST,  self::modules());
    }

    private static function modules()
    {
        $permissions = [];

        if (Route::has('shortlink.link.index')) {
            $permissions[] = ['label' => 'View Shortlink', 'name' => 'view-shortlink', 'group' => 'Shortlink'];
        }

        if (Route::has('custom-form.forms.index')) {
            $permissions = array_merge($permissions, [
                ['label' => 'Create Custom Form', 'name' => 'create-custom-form', 'group' => 'CustomForm'],
                ['label' => 'Update Custom Form', 'name' => 'update-custom-form', 'group' => 'CustomForm'],
                ['label' => 'View Custom Form', 'name' => 'view-custom-form', 'group' => 'CustomForm'],
                ['label' => 'Delete Custom Form', 'name' => 'delete-custom-form', 'group' => 'CustomForm'],

                ['label' => 'Create Custom Form Record', 'name' => 'create-custom-form-record', 'group' => 'CustomForm'],
                ['label' => 'Update Custom Form Record', 'name' => 'update-custom-form-record', 'group' => 'CustomForm'],
                ['label' => 'View Custom Form Record', 'name' => 'view-custom-form-record', 'group' => 'CustomForm'],
                ['label' => 'Delete Custom Form Record', 'name' => 'delete-custom-form-record', 'group' => 'CustomForm'],
            ]);
        }

        return $permissions;
    }
}
