import { Spinner } from "flowbite-react";
import React from "react";

export default function Button({ children, type = "", processing, onClick }) {
    let className = ""
    if(type === "" || type === "primary") {
        className = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    } else if (type === "secondary") {
        className = "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
    }

    return (
        <button 
            type="button" 
            className={className}
            disabled={processing}
            onClick={onClick}
        >
            <div className="flex items-center justify-between space-x-1">
                {processing ? (
                    <Spinner/>
                ) : (
                    <div>
                        {children}
                    </div>
                )}
            </div>
            
        </button>
    )
}