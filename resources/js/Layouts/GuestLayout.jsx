import React, { useEffect } from 'react';
import ApplicationLogo from '@/Components/Defaults/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {

    useEffect(() => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [])

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-slate-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="w-full max-w-md flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                <div className="p-4 md:p-5">
                    <div className='flex justify-center py-4'>
                        <Link href="/">
                            <ApplicationLogo className="w-auto h-20 fill-current text-gray-500 text-5xl font-bold dark:text-white" />
                        </Link>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
