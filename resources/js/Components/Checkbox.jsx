import React from "react";


const BottomTextHelper = ({ error }) => {
    if (!error) return null;

    return (
        <p className="text-sm text-red-600 mt-2" id="hs-validation-name-error-helper">{error}</p>
    )
}

export default function Checkbox(props) {
    return (
        <>
            <div className="flex">
                <input
                    name={props.name}
                    type="checkbox"
                    className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    onChange={props.onChange}
                    checked={props.value}
                    disabled={props.disabled} />
                <label className="text-sm text-gray-700 ms-3 dark:text-gray-400">
                    {props.label}
                </label>
            </div>
            <BottomTextHelper error={props.error} />
        </>
    )
}