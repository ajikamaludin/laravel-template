import React, { forwardRef } from "react";

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

const TextInput = forwardRef((props, ref) => {
    const { label, error, ...inputProps } = props;

    const defaultClassName = `py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600`;

    const errorClassName = `py-3 px-4 block w-full border-red-500 rounded-lg text-sm 
    focus:border-red-500 focus:ring-red-500 dark:bg-gray-800 dark:border-red-500 dark:text-gray-400`;

    const className = error ? errorClassName : defaultClassName;

    return (
        <>
            <Label label={label} />
            <input
                ref={ref}
                {...inputProps}
                className={`${className} ${props.className ? props.className : ''}`}
            />
            <BottomTextHelper error={error} />
        </>
    );
});

export default TextInput;