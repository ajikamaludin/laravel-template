import { NumericFormat } from 'react-number-format'

import TextInput from './text-input'
import Label from './label'

export default function FormInputNumeric({
    className = '',
    name,
    onChange,
    value,
    label,
    error,
}) {
    return (
        <div className="form-control">
            <Label label={label} />
            <NumericFormat
                className={className ?? ''}
                thousandSeparator="."
                decimalSeparator=","
                allowNegative={false}
                allowLeadingZeros={false}
                customInput={TextInput}
                value={value}
                name={name}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: name,
                            value: values.floatValue,
                        },
                    })
                }}
            />
            {error && (
                <p className="mb-2 text-sm text-red-600 dark:text-red-500">
                    {error}
                </p>
            )}
        </div>
    )
}
