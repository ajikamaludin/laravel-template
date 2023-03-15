import React from 'react';
import { router } from '@inertiajs/react';
import { Sidebar } from 'flowbite-react';
import { HiLogout } from 'react-icons/hi';
import { filterOpenMenu } from './helpers';
import routes from './routes';
import { formatDate } from '@/utils';

export default function SidebarNav({ user }) {
    const menus = routes.filter(item => {
        item.open = false
        if (!item.show) {
            return null
        }
        if (+user.is_superadmin === 1) {
            return filterOpenMenu(user, item)
        }
        if(user.role.permissions.find(p => p.name === item.permission)) {
            return item
        }

        return filterOpenMenu(user, item)
    })

    return (
        <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    {menus.map(item => (
                        <div key={item.name}>
                            {item.items === undefined ? (
                            <Sidebar.Item
                                onClick={() => router.visit(item.route)}
                                icon={item.icon}
                                active={route().current(item.active)}
                            >
                                {item.name}
                            </Sidebar.Item>
                            ) : (
                                <Sidebar.Collapse
                                    icon={item.icon}
                                    label={item.name}
                                    open={item.open}
                                >
                                    {item.items.map(item => (
                                        <Sidebar.Item 
                                            key={item.name}
                                            onClick={() => router.visit(item.route)} 
                                            icon={item.icon}
                                            active={route().current(item.active)}
                                        >
                                            {item.name}
                                        </Sidebar.Item>
                                    ))}
                                    
                                </Sidebar.Collapse>
                            )}
                        </div>
                    ))}
                    <Sidebar.Item
                        onClick={() => router.post(route('logout'))}
                        icon={HiLogout}
                    >
                        Logout
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
                <p className='text-sm font-light text-gray-900 dark:text-gray-100 text-center bottom-4 left-4 pt-10'>
                    Nusa Travel &copy; {(new Date()).getFullYear()} 
                </p>
            </Sidebar.Items>
        </Sidebar>
    )
}