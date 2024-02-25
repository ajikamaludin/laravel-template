import React, { useEffect, useRef, useState } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import { filterAllowedMenu } from '@/Layouts/Partials/helpers.cjs'
import routes from '@/Layouts/Partials/routes.cjs'
import Logo from '@/Components/TailAdmin/images/logo/logo.svg'
import MenuArrow from '@/Components/TailAdmin/Icons/MenuArrow'
import LogoutIcon from '@/Components/TailAdmin/Icons/Logout'

const SidebarItem = ({ item }) => {
    return (
        <Link
            href={item.route}
            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                route().current(item.active) && 'bg-graydark dark:bg-meta-4'
            }`}
        >
            {item.icon && <item.icon className="h-5 w-5" aria-hidden="true" />}
            {item.name}
        </Link>
    )
}

const SidebarItemGroup = ({ item }) => {
    const [open, setOpen] = useState(false)

    const toggle = () => {
        setOpen(!open)
    }

    useEffect(() => {
        item.items.map((item) => {
            route().current(item.active) ? setOpen(true) : ''
        })
    }, [])

    return (
        <>
            <div
                className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    open && 'bg-graydark dark:bg-meta-4'
                }`}
                onClick={toggle}
            >
                {item.icon && (
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                )}
                {item.name}
                <div
                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                        open && 'rotate-180'
                    }`}
                >
                    <MenuArrow />
                </div>
            </div>
            {/* <!-- Dropdown Menu Start --> */}
            <div
                className={`translate transform overflow-hidden ${
                    !open && 'hidden'
                }`}
            >
                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                    {item.items.map((item) => (
                        <li key={item.route}>
                            <SidebarItem item={item} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default function SidebarNav({ user, show, setShow }) {
    const {
        props: { app_name },
    } = usePage()
    const menus = routes.filter((item) => {
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

    const trigger = useRef(null)
    const sidebar = useRef(null)

    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
    const [sidebarExpanded] = useState(
        storedSidebarExpanded === null
            ? false
            : storedSidebarExpanded === 'true'
    )

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return
            if (
                !show ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return
            setShow(false)
        }
        document.addEventListener('click', clickHandler)
        return () => document.removeEventListener('click', clickHandler)
    })

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!show || keyCode !== 27) return
            setShow(false)
        }
        document.addEventListener('keydown', keyHandler)
        return () => document.removeEventListener('keydown', keyHandler)
    })

    useEffect(() => {
        localStorage.setItem('sidebar-expanded', sidebarExpanded.toString())
        if (sidebarExpanded) {
            document.querySelector('body')?.classList.add('sidebar-expanded')
        } else {
            document.querySelector('body')?.classList.remove('sidebar-expanded')
        }
    }, [sidebarExpanded])

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
                show ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            {/* <!-- SIDEBAR HEADER --> */}
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <div>
                    <img src={Logo} alt="Logo" />
                </div>
                <button
                    ref={trigger}
                    onClick={() => setShow(!show)}
                    aria-controls="sidebar"
                    aria-expanded={show}
                    className="block lg:hidden"
                >
                    <svg
                        className="fill-current"
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                            fill=""
                        />
                    </svg>
                </button>
            </div>
            {/* <!-- SIDEBAR HEADER --> */}

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                            MENU
                        </h3>

                        <ul className="mb-6 flex flex-col gap-1.5">
                            {menus.map((item) => (
                                <li key={`item-${item.name}`}>
                                    {item.items === undefined ? (
                                        <SidebarItem item={item} />
                                    ) : (
                                        <SidebarItemGroup item={item} />
                                    )}
                                </li>
                            ))}
                            <li>
                                <div onClick={() => router.post(route('logout'))} className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`}>
                                    <LogoutIcon/>
                                    Logout
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>
    )
}
