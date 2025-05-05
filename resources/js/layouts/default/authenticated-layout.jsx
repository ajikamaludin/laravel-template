import React, { useEffect } from 'react'
import { usePage } from '@inertiajs/react'
import { Toaster } from 'sonner'
import { themeChange } from 'theme-change'
import { Menu } from 'lucide-react'

import SidebarNav from './partials/sidebar-nav'
import UserProfileMenu from './partials/user-profile-menu'
import { Breadcrumb, DarkSwitch, ThemeSwitch } from '@/components/index'
import { showToast } from '@/utils'
import { useSidebar } from '@/hooks'

export default function AuthenticatedLayout({
    children,
    title = '',
    breadcumbs = [],
}) {
    const {
        props: { auth, flash },
    } = usePage()
    const { isShowSidebar, toggleSidebar } = useSidebar(true)

    useEffect(() => {
        if (flash.message !== null) {
            showToast(flash.message.message, flash.message.type)
        }
    }, [flash])

    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
    }, [])

    return (
        <div className="min-h-screen">
            <SidebarNav
                user={auth.user}
                show={isShowSidebar}
                setShow={toggleSidebar}
            />
            <main
                className={`transition ${isShowSidebar ? 'lg:ml-64' : 'ml-0 '}`}
            >
                <nav className="bg-base-200 border-b border-base-300">
                    <div className="mx-auto px-4 py-2">
                        <div className="flex justify-between">
                            <div className="-mr-2 flex items-center space-x-2">
                                <button
                                    onClick={() => toggleSidebar()}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-base-content focus:outline-hidden transition duration-150 ease-in-out btn btn-ghost"
                                >
                                    <Menu className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="flex flex-row items-center gap-3">
                                <div className="h-full flex items-center">
                                    <DarkSwitch />
                                </div>
                                <div className="h-full flex items-center">
                                    <ThemeSwitch />
                                </div>
                                <div className="h-full flex items-center">
                                    <UserProfileMenu />
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="p-6">
                    <div className="flex flex-row justify-between items-center">
                        <h3 className="text-lg font-medium">{title}</h3>
                        <Breadcrumb>
                            {breadcumbs.map((b, i) => (
                                <Breadcrumb.Item
                                    key={i}
                                    r={b.href}
                                >
                                    {b.name}
                                </Breadcrumb.Item>
                            ))}
                        </Breadcrumb>
                    </div>
                    <div className="mt-6">{children}</div>
                </div>
                <div className="mb-4"></div>
            </main>
            <Toaster
                theme="system"
                richColors="true"
                toastOptions={{
                    duration: 3000,
                    dismissible: true,
                }}
            />
        </div>
    )
}
