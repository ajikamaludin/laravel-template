import React from "react";

const Label = ({ label }) => {
    if (!label) return null;

    return (
        <label
            className="block text-sm font-medium mb-2 dark:text-white"
        >
            {label}
        </label>
    );
}

const BottomTextHelper = ({ error }) => {
    if (!error) return null;

    return (
        <p className="text-sm text-red-600 mt-2" id="hs-validation-name-error-helper">{error}</p>
    )
}

export default function TextInput(props) {
    const defaultClassName = `
    py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500
    focus:ring-blue-500 disabled:opacity-50 dark:bg-slate-900
    dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600`

    const errorClassName = `py-3 px-4 block w-full border-red-500 rounded-lg text-sm 
    focus:border-red-500 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`

    return (
        <>
            <Label label={props.label} />
            
            <input
                type={props.type || 'text'}
                id={props.id || `${props.type}-${props.name}`}
                className={`${props.error ? errorClassName : defaultClassName} ${props.className}`}
                name={props.name}
                onChange={props.onChange}
                value={props.value}
                disabled={props.disabled}
                placeholder={props.placeholder || ''}
                autoComplete={props.autoComplete}
                autoFocus={props.autoFocus}
                readOnly={props.readOnly}
                onKeyDownCapture={props.onKeyDownCapture}
            />

            <BottomTextHelper error={props.error} />
        </>
    )
}