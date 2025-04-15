import React, { useEffect, useState } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import {
    HiXMark,
    HiArrowRightOnRectangle,
    HiChartPie,
    HiUser,
    HiCog,
    HiGlobeAlt,
    HiInformationCircle,
    HiDocumentCheck,
    HiClipboardDocumentList,
    HiCalendar,
} from 'react-icons/hi2'
import { LuDisc3 } from 'react-icons/lu'

import { filterAllowedMenu } from './helpers.cjs'

const Icons = {
    HiXMark: HiXMark,
    HiArrowRightOnRectangle: HiArrowRightOnRectangle,
    HiChartPie: HiChartPie,
    HiUser: HiUser,
    HiCog: HiCog,
    HiGlobeAlt: HiGlobeAlt,
    HiInformationCircle: HiInformationCircle,
    HiClipboardDocumentList: HiClipboardDocumentList,
    HiDocumentCheck: HiDocumentCheck,
    HiCalendar: HiCalendar,
    LuDisc3: LuDisc3,
}

const ItemIcon = ({ icon, ...rest }) => {
    const Component = Icons[icon]

    return <Component {...rest} />
}

const SidebarItem = ({ item }) => {
    return (
        <li>
            <Link
                href={item.route}
                className={`${
                    route().current(item.active) ? 'menu-active' : ''
                }`}
            >
                {item.icon && (
                    <ItemIcon
                        icon={item.icon}
                        className="h-5 w-5"
                        aria-hidden="true"
                    />
                )}
                {item.name}
            </Link>
        </li>
    )
}

const SidebarItemGroup = ({ item }) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        item.items.map((item) => {
            route().current(item.active) ? setOpen(true) : ''
        })
    }, [])

    return (
        <li>
            <details open={open}>
                <summary>
                    {item.icon && (
                        <ItemIcon
                            icon={item.icon}
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    )}
                    {item.name}
                </summary>
                <ul>
                    {item.items.map((item) => (
                        <div key={item.route}>
                            <SidebarItem item={item} />
                        </div>
                    ))}
                </ul>
            </details>
        </li>
    )
}

export default function SidebarNav({ user, show, setShow }) {
    const {
        props: {
            app: { app_name, app_logo },
            navigation,
        },
    } = usePage()

    const menus = navigation.filter((item) => {
        item.open = false

        if (!item.show) {
            return null
        }

        if (user.role === null) {
            return filterAllowedMenu(user, item)
        }

        if (user.role.permissions.find((p) => p.name === item.permission)) {
            return item
        }

        return filterAllowedMenu(user, item)
    })

    return (
        <div
            className={`${
                show ? 'block' : 'hidden'
            } flex flex-col h-screen overflow-y-auto transition-all duration-300 transform fixed top-0 start-0 bottom-0 z-50 w-full md:w-64 bg-base-200 md:block md:translate-x-0 md:end-auto md:bottom-0 `}
        >
            <div className="flex flex-col justify-between flex-1">
                <div className="">
                    <div className="flex flex-row justify-between md:justify-center p-6">
                        <div className="">
                            {app_logo ? (
                                <img
                                    src={route('file.show', app_logo)}
                                    alt={app_name}
                                />
                            ) : (
                                <Link
                                    className="flex-none text-xl font-semibold text-base-content"
                                    href={route('dashboard')}
                                >
                                    {app_name}
                                </Link>
                            )}
                        </div>
                        <div
                            className="block md:hidden"
                            onClick={() => setShow(false)}
                        >
                            <HiXMark className="w-5 h-5" />
                        </div>
                    </div>
                    <nav className="w-full">
                        <ul className="w-full menu rounded-box">
                            {/* <SidebarItem
                                item={{
                                    name: 'Dashboard',
                                    show: true,
                                    icon: HiChartPie,
                                    route: route('dashboard'),
                                    active: 'dashboard',
                                    permission: 'view-dashboard',
                                }}
                            /> */}
                            {menus.map((item) => (
                                <div key={`item-${item.name}`}>
                                    {item.items === undefined ? (
                                        <SidebarItem item={item} />
                                    ) : (
                                        <SidebarItemGroup item={item} />
                                    )}
                                </div>
                            ))}
                            <li>
                                <div
                                    onClick={() => router.post(route('logout'))}
                                >
                                    <HiArrowRightOnRectangle
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                    Logout
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="p-6">
                <p className="text-sm font-light text-center bottom-4 left-4 text-base-content">
                    {app_name} &copy; {new Date().getFullYear()}
                </p>
            </div>
        </div>
    )
}
