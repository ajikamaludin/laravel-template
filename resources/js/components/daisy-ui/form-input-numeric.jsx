import { NumericFormat } from 'react-number-format'

import TextInput from './text-input'
import Label from './label'
import TextInputError from './text-input-error'

export default function FormInputNumeric({
    name,
    onChange,
    value,
    label,
    error,
    className = '',
}) {
    const defaultClassName = `${className}`

    const errorClassName = `input-error`

    const customClassName = error ? errorClassName : defaultClassName

    return (
        <fieldset className="fieldset">
            <Label label={label} />
            <NumericFormat
                className={customClassName ?? 'px-0'}
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
                autoComplete="off"
            />
            <TextInputError error={error} />
        </fieldset>
    )
}
