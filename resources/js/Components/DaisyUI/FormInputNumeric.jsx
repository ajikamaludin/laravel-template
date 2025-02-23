import { NumericFormat } from 'react-number-format'

import TextInput from './TextInput'
import Label from './Label'

export default function FormInputNumeric({
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
