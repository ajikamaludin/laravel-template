import { useEffect } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { isEmpty } from 'lodash'
import { themeChange } from 'theme-change'
import { Toaster } from 'sonner'
import { showToast } from '@/utils'

export default function Guest({ children }) {
    const {
        props: {
            flash,
            app: { app_name, app_logo },
        },
    } = usePage()

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
        <div className="min-h-screen flex flex-col sm:justify-center items-center md:pt-6 bg-base-300">
            {/* card */}
            <div className="w-full h-screen md:h-fit bg-base-100 shadow-xl max-w-md flex flex-col md:rounded-xl">
                <div className="p-4 md:p-5">
                    <div className="flex justify-center py-4">
                        <Link href="/">
                            <>
                                {isEmpty(app_logo) && (
                                    <img
                                        src={app_logo}
                                        className="w-36 h-3w-36"
                                    />
                                )}
                                <h1 className="w-auto h-20 fill-current text-base-content text-5xl font-bold">
                                    {app_name}
                                </h1>
                            </>
                        </Link>
                    </div>
                    {children}
                </div>
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
