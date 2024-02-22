import React, { useEffect, useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { filterAllowedMenu } from './helpers.cjs'
import routes from './routes.cjs'

const SidebarItem = ({ item }) => {
    return (
        <li>
            <Link href={item.route} className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 ${route().current(item.active) ? 'bg-gray-100 dark:bg-gray-900 dark:text-white' : ''}`}>
                {item.icon && ( <item.icon className="h-5 w-5" aria-hidden="true" /> )}
                {item.name}
            </Link>
        </li>
    )
}

const SidebarItemGroup = ({ item }) => {
    const [open, setOpen] = useState(false)

    const toggle = () => {setOpen(!open)}

    useEffect(() => {
        item.items.map((item) => {
            route().current(item.active) ? setOpen(true) : ''
        })
    }, [])

    return (
        <li>
            <button 
                type="button" 
                className="hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                onClick={toggle}
            >
                {item.icon && ( <item.icon className="h-5 w-5" aria-hidden="true" /> )}
                {item.name}

                {open ? (
                    <svg className="hs-accordion-active:block ms-auto block w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                ) : (
                    <svg className="hs-accordion-active:hidden ms-auto block w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                    </svg>
                )}
            </button>

            <div className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${open ? 'block' : 'hidden'}`}>
                <ul className="p-2 ps-2 space-y-1.5">
                    {item.items.map((item) => (
                        <div key={item.route}>
                        <SidebarItem item={item}/>
                        </div>
                    ))}
                </ul>
            </div>
        </li>
    )
}

export default function SidebarNav({ user, show }) {
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

    return (
        <div className={`${show ? 'block' : 'hidden'} flex flex-col h-screen overflow-y-auto transition-all duration-300 transform fixed top-0 start-0 bottom-0 z-[50] w-64 bg-white border-e border-gray-200 pt-7 pb-10 md:block md:translate-x-0 md:end-auto md:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700`}>
            <div className='flex flex-col justify-between flex-1'>
                <div className=''>
                    <div className="px-6">
                        <Link className="flex-none text-xl font-semibold dark:text-white" href={route('dashboard')} aria-label="Brand">{app_name}</Link>
                    </div>
                    <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
                        <ul className="space-y-1.5">
                            {menus.map((item) => (
                                <div key={`item-${item.name}`}>
                                    {item.items === undefined ? (
                                        <SidebarItem item={item}/>
                                    ) : (
                                        <SidebarItemGroup item={item} />
                                    )}
                                </div>
                            ))}
                        </ul>
                        
                    </nav>
                </div>
            </div>
            <div>
                <p className="text-sm font-light text-gray-900 dark:text-gray-100 text-center bottom-4 left-4 pt-10">
                        {app_name} &copy; {new Date().getFullYear()}
                </p>
            </div>
        </div>
    )
}
