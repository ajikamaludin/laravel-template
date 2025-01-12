import React from 'react'
import Datepicker from 'react-tailwindcss-datepicker'

/**
 *
 * @param {*} param0
 * @returns
 *
 * Example :
 * <FormInputDateRanger
 *     value={dates} // {startDate: '', endDate: ''}
 *     label={'Date Range'}
 *     onChange={(dates) => handle(input, date)}
 * />
 */
export default function FormInputDateRanger({
    value,
    onChange,
    label = '',
    error,
    placeholder = '',
}) {
    return (
        <div>
            {label !== '' && (
                <div className="label">
                    <label className="label-text">{label}</label>
                </div>
            )}
            <Datepicker
                inputClassName={'input input-bordered w-full text-base-content'}
                value={value}
                onChange={(date) => onChange(date)}
                displayFormat={'DD/MM/YYYY'}
                placeholder={placeholder || 'Select date'}
            />
            {error && (
                <p className="mb-2 text-sm text-red-600 dark:text-red-500">
                    {error}
                </p>
            )}
        </div>
    )
}
