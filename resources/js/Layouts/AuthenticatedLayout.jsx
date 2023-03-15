import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ApplicationLogo from '@/Components/Defaults/ApplicationLogo';
import Dropdown from '@/Components/Defaults/Dropdown';
import { Link } from '@inertiajs/react';
import { Breadcrumb } from 'flowbite-react';
import { HiMenu, HiChevronDown, HiHome } from 'react-icons/hi'
import { router } from '@inertiajs/react';
import SidebarNav from './Partials/SidebarNav';

export default function Authenticated({ auth, children, flash, page = '', action = ''}) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    useEffect(() => {
        if (flash.message !== null) {
            toast(flash.message.message, {type: flash.message.type})
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
                                    <ApplicationLogo className="block h-12 w-auto fill-current" />
                                </Link>
                            </div>

                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150 dark:bg-gray-700 dark:hover:text-gray-50 dark:text-gray-200 gap-2"
                                            >
                                                {auth.user.name}
                                                <HiChevronDown/>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden space-x-2">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <HiMenu/>
                            </button>
                        </div>
                    </div>
                </div>

            </nav>

            <div className='flex-1 flex flex-row'>
                <div className={`w-fit ${showingNavigationDropdown ? 'absolute h-screen z-10' : 'md:block hidden'}`}>
                    <SidebarNav user={auth.user}/>
                </div>
                <main className='w-full'>
                    {page !== '' && (
                        <Breadcrumb
                            className="bg-gray-200 py-3 px-5 mb-2 dark:bg-gray-700"
                        >
                            <Breadcrumb.Item
                                onClick={() => router.visit(route('dashboard'))}
                                icon={HiHome}
                            >
                                <p className='mt-0.5'>{page}</p>
                            </Breadcrumb.Item>
                            {action !== '' && (
                                <Breadcrumb.Item>
                                    {action}
                                </Breadcrumb.Item>
                            )}
                        </Breadcrumb>
                    )}
                    <div className='py-4'>
                        {children}
                    </div>
                </main>
            </div>
            <ToastContainer />
        </div>
    );
}
