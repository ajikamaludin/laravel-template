import Datepicker from 'react-tailwindcss-datepicker'
import Label from './Label'

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
    const inputClassName = `input w-full text-base-content ${
        error ? 'input-error' : 'input-bordered'
    }`

    return (
        <div>
            <Label label={label} />
            <Datepicker
                inputClassName={inputClassName}
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
