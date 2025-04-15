import { showToast } from '@/utils'
import { usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { Toaster } from 'sonner'
import { themeChange } from 'theme-change'

export default function CustomLayout({ children }) {
    const {
        props: { flash },
    } = usePage()

    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
    }, [])

    useEffect(() => {
        if (flash.message !== null) {
            showToast(flash.message.message, flash.message.type)
        }
    }, [flash])

    return (
        <div className="min-h-screen flex flex-col justify-center">
            {/* card */}
            <div className="w-full flex flex-col mx-auto">
                <div>{children}</div>
            </div>
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
