import React from "react"
const Table = ({ children }) => {
    return (
        <div className="w-full py-4 overflow-x-auto">
            <div className="min-w-max" info="internal-table">
            {children}
            </div>
        </div>
    )
}

Table.Header = ({ children, className }) => {
    return (
        <div className={`grid grid-cols-4 w-full text-start text-xs font-medium text-gray-500 uppercase border-b dark:border-gray-700 rounded-t bg-gray-50 dark:bg-gray-700 ${className}`}>
            {children}
        </div>
    )
}

Table.HeaderItem = ({ children, className }) => {
    return (
        <div
            className={`py-3 px-6 ${className ? className : 'col-span-1'}`}
        >
            {children}
        </div>
    )
}

Table.Body = ({ children, className }) => {
    return (
        <div 
            className={`grid grid-cols-4 w-full whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 border-b dark:border-gray-700 ${className}`}>
            {children}
        </div>
    )
}

Table.BodyItem = ({ children, className }) => {
    return (
        <div 
            className={`${className}`}>
            {children}
        </div>
    )
}

export default Table;