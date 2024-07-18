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
        <div className="form-control">
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
        </div>
    )
}

export const SelectOptionArray = ({
    label = '',
    value,
    onChange = () => {},
    error,
    name,
    options = [],
}) => {
    return (
        <Select
            label={label}
            value={value}
            onChange={onChange}
            error={error}
            name={name}
        >
            <Option value={''}></Option>
            {options.map((option) => (
                <Option value={option} key={option}>
                    {option}
                </Option>
            ))}
        </Select>
    )
}

export const SelectOptionObject = ({
    label = '',
    value,
    onChange = () => {},
    error,
    name,
    options = {},
}) => {
    return (
        <Select
            label={label}
            value={value}
            onChange={onChange}
            error={error}
            name={name}
        >
            <Option value={''}></Option>
            {Object.keys(options).map((option) => (
                <Option value={options[option]} key={option}>
                    {options[option]}
                </Option>
            ))}
        </Select>
    )
}
