import React, { useEffect } from 'react'
import ApplicationLogo from '@/Components/Defaults/ApplicationLogo'
import { Link } from '@inertiajs/react'
import { useColorMode } from '@/hooks'

export default function Guest({ children }) {
    const _ = useColorMode()

    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <div className="flex h-screen overflow-hidden">
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
