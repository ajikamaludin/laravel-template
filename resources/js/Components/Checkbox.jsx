import React from "react";

export default function Checkbox({ value, name, onChange, label = '', error, disabled = false }) {
    return (
        <>
            <div className="flex items-center mb-1">
                <input 
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                    name={name}
                    disabled={disabled}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                {label !== '' && (
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {label}
                    </label>
                )}
                
            </div>
            {error && (
                <p className="mb-2 text-sm text-red-600 dark:text-red-500">{error}</p>
            )}
        </>
    )
} 