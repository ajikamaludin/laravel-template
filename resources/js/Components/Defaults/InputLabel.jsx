import React from 'react';

export default function InputLabel({ forInput, value, className, children }) {
    return (
        <label htmlFor={forInput} className={`block font-medium text-sm text-gray-700 dark:text-white` + className}>
            {value ? value : children}
        </label>
    );
}
