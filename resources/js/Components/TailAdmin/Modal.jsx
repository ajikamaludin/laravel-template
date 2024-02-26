import React from "react";
import { HiX } from "react-icons/hi";


export default function Modal({ isOpen, toggle = () => {}, children, title = "", maxW = '3xl' }) {
    return (
        <div className={`${isOpen ? "fixed block" : "hidden "}  left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5`}>
            <div className={`relative max-w-${maxW} h-full md:h-auto`}>
                <div className="flex flex-col w-full max-w-142.5 rounded-lg bg-white dark:bg-boxdark">
                    <div className="flex items-start justify-between rounded-t dark:border-gray-700 p-4">
                        <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 py-2 pl-2">{ title }</h3>
                        <button aria-label="Close" className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white" type="button" onClick={toggle}>
                            <HiX className="h-5 w-5"/>
                        </button>
                    </div>
                    <div className="md:px-17.5 px-8 pb-12 md:pb-15 space-y-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}