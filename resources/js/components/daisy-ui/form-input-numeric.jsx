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
}) {
    const defaultClassName = ``

    const errorClassName = `input-error`

    const className = error ? errorClassName : defaultClassName

    return (
        <div className="fieldset">
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
                autoComplete="off"
            />
            <TextInputError error={error} />
        </div>
    )
}
