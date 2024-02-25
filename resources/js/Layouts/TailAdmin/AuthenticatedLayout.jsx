import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { usePage } from '@inertiajs/react'

import SidebarNav from './SidebarNav'
import Header from './Header'

export default function Authenticated({
    children,
    page = '',
    action = '',
}) {
    const { props: { auth, flash } } = usePage()
    const [sidebarOpen, setSidebarOpen] =
        useState(false)

    useEffect(() => {
        if (flash.message !== null) {
            toast(flash.message.message, { type: flash.message.type })
        }
    }, [flash])

    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex h-screen overflow-hidden">
            {/* <!-- ===== Sidebar Start ===== --> */}
            <SidebarNav user={auth.user} show={sidebarOpen} setShow={setSidebarOpen}/>
            {/* <!-- ===== Sidebar End ===== --> */}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Header show={sidebarOpen} setShow={setSidebarOpen} />
                <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        {children}
                    </div>
                </main>
            </div>
            <ToastContainer />
        </div>
        </div>
    )
}
