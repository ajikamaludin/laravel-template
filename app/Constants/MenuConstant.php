<?php

namespace App\Constants;

use Illuminate\Support\Facades\Route;

class MenuConstant
{
    public static function all()
    {
        $menu = [
            [
                'name' => 'Dashboard',
                'show' => true,
                'icon' => 'HiChartPie',
                'route' => route('dashboard'),
                'active' => 'dashboard',
                'permission' => 'view-dashboard',
            ],
            [
                'name' => 'User',
                'show' => true,
                'icon' => 'HiUser',
                'items' => [
                    [
                        'name' => 'Roles',
                        'show' => true,
                        'route' => route('roles.index'),
                        'active' => 'roles.*',
                        'permission' => 'view-role',
                    ],
                    [
                        'name' => 'Users',
                        'show' => true,
                        'route' => route('user.index'),
                        'active' => 'user.index',
                        'permission' => 'view-user',
                    ],
                ],
            ],
            [
                'name' => 'Setting',
                'show' => true,
                'icon' => 'HiCog',
                'route' => route('setting.index'),
                'active' => 'setting.index',
                'permission' => 'view-setting',
            ],

            // # Add Generated Menu Here!
        ];

        if (Route::has('shortlink.link.index')) {
            $menu = array_merge(
                $menu,
                [[
                    'name' => 'Shortlink',
                    'show' => true,
                    'icon' => 'HiGlobeAlt',
                    'route' => route('shortlink.link.index'),
                    'active' => 'shortlink.link.*',
                    'permission' => 'view-shortlink',
                ]],
            );
        }

        if (Route::has('custom-form.forms.index')) {
            $menu = array_merge($menu, [[
                'name' => 'Custom Form',
                'show' => true,
                'icon' => 'HiInformationCircle',
                'route' => route('custom-form.forms.index'),
                'active' => 'custom-form.forms.*',
                'permission' => 'view-custom-form',
            ]]);
        }

        return $menu;
    }

    public static function handle()
    {
        return self::all();
    }
}
