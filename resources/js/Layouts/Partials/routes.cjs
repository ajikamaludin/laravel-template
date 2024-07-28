import {
    HiChartPie,
    HiUser,
    HiCog,
    HiGlobeAlt,
    HiInformationCircle,
} from 'react-icons/hi2'

export default [
    {
        name: 'Dashboard',
        show: true,
        icon: HiChartPie,
        route: route('dashboard'),
        active: 'dashboard',
        permission: 'view-dashboard',
    },
    {
        name: 'User',
        show: true,
        icon: HiUser,
        items: [
            {
                name: 'Roles',
                show: true,
                route: route('roles.index'),
                active: 'roles.*',
                permission: 'view-role',
            },
            {
                name: 'Users',
                show: true,
                route: route('user.index'),
                active: 'user.index',
                permission: 'view-user',
            },
        ],
    },
    {
        name: 'Setting',
        show: true,
        icon: HiCog,
        route: route('setting.index'),
        active: 'setting.index',
        permission: 'view-setting',
    },
    {
        name: 'Shortlink',
        show: true,
        icon: HiGlobeAlt,
        route: route('shortlink.link.index'),
        active: 'shortlink.link.*',
        permission: 'view-shortlink',
    },
    {
        name: 'Custom Form',
        show: true,
        icon: HiInformationCircle,
        route: route('custom-form.forms.index'),
        active: 'custom-form.forms.*',
        permission: 'view-custom-form',
    },
]
