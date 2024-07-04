import React from 'react'

export const Option = ({ value, children }) => {
    return <option value={value}>{children}</option>
}

export const Select = ({
    label = '',
    value,
    onChange = () => {},
    error,
    name,
    children,
}) => {
    return (
        <>
            {label !== '' && (
                <div className="label">
                    <span className="label-text">{label}</span>
                </div>
            )}
            <select
                className={`select select-bordered w-full ${
                    error ? 'select-error' : ''
                }`}
                name={name}
                onChange={onChange}
                value={value}
            >
                {children}
            </select>
            {error && (
                <p className="mb-2 text-sm text-red-600 dark:text-red-500">
                    {error}
                </p>
            )}
        </>
    )
}
