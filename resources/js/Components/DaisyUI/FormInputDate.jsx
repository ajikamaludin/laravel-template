import React from 'react'
import Datepicker from 'react-tailwindcss-datepicker'

/**
 *
 * @param {*} param0
 * @returns
 *
 * Example :
 * <FormInputDate
 *     value={data.date}
 *     label={'Date'}
 *     onChange={(date) => onChange(input, date)}
 * />
 */
export default function FormInputDate({
    value,
    onChange,
    label = '',
    error,
    placeholder,
}) {
    return (
        <div>
            {label !== '' && <label className="text-label">{label}</label>}
            <Datepicker
                inputClassName={'input input-bordered w-full text-base-content'}
                useRange={false}
                asSingle={true}
                value={{ startDate: value, endDate: value }}
                onChange={({ startDate }) => onChange(startDate)}
                displayFormat={'DD/MM/YYYY'}
                placeholder={placeholder || ''}
            />
            {error && (
                <p className="mb-2 text-sm text-red-600 dark:text-red-500">
                    {error}
                </p>
            )}
        </div>
    )
}
