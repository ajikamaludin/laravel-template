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
                <div className="p-5 md:p-10">
                    <div className="flex justify-center py-2">
                        <Link href="/">
                            <>
                                {app_logo ? (
                                    <img
                                        src={route('file.show', app_logo)}
                                        className="p-4"
                                    />
                                ) : (
                                    <h1 className="w-auto fill-current text-base-content text-4xl font-bold mb-2">
                                        {app_name}
                                    </h1>
                                )}
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
