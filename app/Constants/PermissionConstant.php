<?php

namespace App\Constants;

class PermissionConstant
{
    const LIST = [
        ['label' => 'View Dashboard', 'name' => 'view-dashboard'],

        ['label' => 'Create User', 'name' => 'create-user'],
        ['label' => 'Update User', 'name' => 'update-user'],
        ['label' => 'View User', 'name' => 'view-user'],
        ['label' => 'Delete User', 'name' => 'delete-user'],

        ['label' => 'Create Role', 'name' => 'create-role'],
        ['label' => 'Update Role', 'name' => 'update-role'],
        ['label' => 'View Role', 'name' => 'view-role'],
        ['label' => 'Delete Role', 'name' => 'delete-role'],

        ['label' => 'View Setting', 'name' => 'view-setting'],

        // Modules Permissions
        ['label' => 'View Shortlink', 'name' => 'view-shortlink'],

        ['label' => 'Create Custom Form', 'name' => 'create-custom-form'],
        ['label' => 'Update Custom Form', 'name' => 'update-custom-form'],
        ['label' => 'View Custom Form', 'name' => 'view-custom-form'],
        ['label' => 'Delete Custom Form', 'name' => 'delete-custom-form'],

        ['label' => 'Create Custom Form Record', 'name' => 'create-custom-form-record'],
        ['label' => 'Update Custom Form Record', 'name' => 'update-custom-form-record'],
        ['label' => 'View Custom Form Record', 'name' => 'view-custom-form-record'],
        ['label' => 'Delete Custom Form Record', 'name' => 'delete-custom-form-record'],

        // #Add New Permission Below!

    ];
}
