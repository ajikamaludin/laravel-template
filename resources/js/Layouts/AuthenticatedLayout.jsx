import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Link, router } from '@inertiajs/react'
import { HiMenu, HiChevronDown, HiHome } from 'react-icons/hi'

import ApplicationLogo from '@/Components/Defaults/ApplicationLogo'
import { Breadcrumb, BreadcrumbItem } from '@/Components/Preline/Breadcrumb'
import Dropdown from '@/Components/Defaults/Dropdown'
import SidebarNav from './Partials/SidebarNav'


export default function Authenticated({
    children,
    auth,
    flash,
    page = '',
    action = '',
}) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false)

    useEffect(() => {
        if (flash.message !== null) {
            toast(flash.message.message, { type: flash.message.type })
        }
    }, [flash])

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-700">
            <nav className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href={route('dashboard')}>
                                    <ApplicationLogo className="block pt-2 h-12 w-full font-bold text-2xl fill-current dark:text-white" />
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className='ml-3 relative'>
                                <button type="button" className="hs-dark-mode-active:hidden block hs-dark-mode group flex items-center text-gray-600 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-gray-500" data-hs-theme-click-value="dark">
                                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                                </button>
                                <button type="button" className="hs-dark-mode-active:block hidden hs-dark-mode group flex items-center text-gray-600 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-gray-500" data-hs-theme-click-value="light">
                                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 8a2 2 0 1 0 4 4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                                </button>
                            </div>
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150 dark:bg-gray-700 dark:hover:text-gray-50 dark:text-gray-200 gap-2"
                                            >
                                                {auth.user.name}
                                                <HiChevronDown />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden space-x-2">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <HiMenu />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex-1 flex flex-row">
                <div
                    className={`w-fit ${
                        showingNavigationDropdown
                            ? 'absolute h-screen z-10'
                            : 'md:block hidden'
                    }`}
                >
                    <SidebarNav user={auth.user} />
                </div>
                <main className="w-full">
                    {page !== '' && (
                        <Breadcrumb>
                            <BreadcrumbItem onClick={() => router.visit(route('dashboard'))} icon={HiHome}>
                                {page}
                            </BreadcrumbItem>
                            {action !== '' && (
                                <BreadcrumbItem>
                                    {action}
                                </BreadcrumbItem>
                            )}
                        </Breadcrumb>
                    )}
                    <div className="py-4">{children}</div>
                </main>
            </div>
            <ToastContainer />
        </div>
    )
}
