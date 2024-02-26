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
        <div className={`grid grid-cols-4 rounded-t-[10px] bg-primary px-5 py-4 lg:px-7.5 2xl:px-11 ${className}`}>
            {children}
        </div>
    )
}

Table.HeaderItem = ({ children, className }) => {
    return (
        <div
            className={`${className ? className : 'col-span-1'}`}
        >
            {children}
        </div>
    )
}

Table.Body = ({ children, className }) => {
    return (
        <div 
            className={`grid grid-cols-4 border-x border-b border-[#EEEEEE] px-5 py-4 dark:border-strokedark lg:px-7.5 2xl:px-11 ${className}`}>
            {children}
        </div>
    )
}

Table.BodyItem = ({ children, className }) => {
    return (
        <div 
            className={`text-[#637381] dark:text-bodydark ${className}`}>
            {children}
        </div>
    )
}

export default Table;