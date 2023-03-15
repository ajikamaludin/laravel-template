import React from "react";
import { HiX } from "react-icons/hi";


export default function Modal({ isOpen, toggle = () => {}, children, title = "", maxW = '2' }) {
    return (
        <div className={`${isOpen ? "" : "hidden "} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 p-4 w-full md:inset-0 h-modal md:h-full justify-center items-center flex bg-opacity-50 dark:bg-opacity-90 bg-gray-900 dark:bg-gray-900`}>
            <div className={`relative w-full max-w-${maxW}xl h-full md:h-auto`}>
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 text-base dark:text-gray-400">
                    <div className="flex items-start justify-between rounded-t dark:border-gray-600 p-2">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white py-2 pl-2">{ title }</h3>
                        <button aria-label="Close" className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" type="button" onClick={toggle}>
                            <HiX className="h-5 w-5"/>
                        </button>
                    </div>
                    <div className="px-4 pb-4 space-y-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}