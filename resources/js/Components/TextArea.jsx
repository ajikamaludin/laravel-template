import React from "react";

export default function TextArea({ label = '', value, name, onChange, rows, error, readOnly }) {
    return (
        <>
            {label !== '' && (
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {label}
                </label>
            )}
            <textarea 
                rows={rows}
                className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white mb-2 ${error ? "border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500" : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"}`}
                name={name}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
            />
            {error && (
                <p className="mb-2 text-sm text-red-600 dark:text-red-500">{error}</p>
            )}
        </>
    )
}