import React from "react";

export const Option = ({ value, children }) => {
    return (
        <option value={value}>{children}</option>
    )
}

export const Select = ({ label = '', value, onChange = () => {}, defaultValue = "", error, name, children }) => {
    return (
        <>
            {label !== '' && (
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            )}
            <select 
                className={`mb-2 bg-gray-50 border  text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white ${error ? "border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500" : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"}`}
                name={name}
                onChange={onChange}
                value={value}
            >
                {children}
            </select>
            {error && (
                <p className="mb-2 text-sm text-red-600 dark:text-red-500">{error}</p>
            )}
        </>
    )
}