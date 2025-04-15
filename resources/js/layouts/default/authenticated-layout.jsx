import React, { useState, useEffect } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import { Toaster } from 'sonner'
import { isArray, isEmpty } from 'lodash'
import { themeChange } from 'theme-change'
import { HiBars3 } from 'react-icons/hi2'

import SidebarNav from './partials/sidebar-nav'
import { Breadcrumb, DarkSwitch, ThemeSwitch } from '@/components/index'
import { showToast } from '@/utils'

export default function AuthenticatedLayout({
    children,
    page = '',
    action = '',
}) {
    const {
        props: { auth, flash },
    } = usePage()
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false)

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
                show={showingNavigationDropdown}
                setShow={setShowingNavigationDropdown}
            />
            <main className="ml-0 transition md:ml-64">
                <nav className="">
                    <div className="mx-auto px-4 py-2">
                        <div className="flex justify-between sm:justify-end">
                            <div className="-mr-2 flex items-center sm:hidden space-x-2">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState
                                        )
                                    }
                                    className="inline-flex items-center justify-center p-2 rounded-md text-base-content focus:outline-hidden  transition duration-150 ease-in-out"
                                >
                                    <HiBars3 className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="flex flex-row items-center sm:ml-6">
                                <div className="ml-3 relative">
                                    <DarkSwitch />
                                </div>
                                <div className="ml-3 relative">
                                    <ThemeSwitch />
                                </div>
                                <div className="ml-3 relative">
                                    <details className="dropdown dropdown-end">
                                        <summary className="btn btn-ghost btn-circle">
                                            <span className="inline-flex items-center justify-center h-[2.375rem] w-[2.375rem] rounded-full bg-gray-500 text-sm font-semibold text-white leading-none">
                                                {auth.user.name
                                                    .split(' ')
                                                    .slice(0, 2)
                                                    .map((n) => n[0])
                                                    .join('')
                                                    .toUpperCase()}
                                            </span>
                                        </summary>

                                        <ul className="mt-2 p-2 shadow-xl menu dropdown-content z-1 bg-base-100 rounded-box w-52">
                                            <li>
                                                <Link
                                                    href={route('profile.edit')}
                                                    as="button"
                                                >
                                                    Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Logout
                                                </Link>
                                            </li>
                                        </ul>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                {page !== '' && (
                    <Breadcrumb>
                        <Breadcrumb.Item
                            onClick={() => router.visit(route('dashboard'))}
                        >
                            {page}
                        </Breadcrumb.Item>
                        {!isEmpty(action) && (
                            <>
                                {isArray(action) ? (
                                    action.map((a, i) => (
                                        <Breadcrumb.Item
                                            key={i}
                                            onClick={() =>
                                                router.visit(route(a.route))
                                            }
                                        >
                                            {a.name}
                                        </Breadcrumb.Item>
                                    ))
                                ) : (
                                    <Breadcrumb.Item>{action}</Breadcrumb.Item>
                                )}
                            </>
                        )}
                    </Breadcrumb>
                )}
                <div className="p-4">{children}</div>
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
