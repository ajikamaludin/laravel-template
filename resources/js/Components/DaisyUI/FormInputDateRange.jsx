import Datepicker from 'react-tailwindcss-datepicker'
import Label from './Label'

/**
 *
 * @param {*} param0
 * @returns
 *
 * Example :
 * <FormInputDateRange
 *     value={dates} // {startDate: '', endDate: ''}
 *     label={'Date Range'}
 *     onChange={(dates) => handle(input, date)}
 * />
 */
export default function FormInputDateRange({
    value,
    onChange,
    label = '',
    error,
    placeholder = '',
}) {
    const inputClassName = `input w-full text-base-content ${
        error ? 'input-error' : 'input-bordered'
    }`

    return (
        <div>
            <Label label={label} />
            <Datepicker
                inputClassName={inputClassName}
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
