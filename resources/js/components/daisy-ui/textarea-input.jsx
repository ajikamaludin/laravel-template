import { forwardRef } from 'react'
import Label from './label'
import TextInputError from './text-input-error'

/**
 * Example :
 * <TextareaInput
 *     name={input.name}
 *     value={input.value}
 *     label={input.name}
 *     onChange={(e) => onChange(input, e.target.value)}
 * />
 */
const TextareaInput = forwardRef((props, ref) => {
    const { label, error, value, ...inputProps } = props

    const defaultClassName = `textarea textarea-bordered w-full`

    const errorClassName = `textarea textarea-bordered textarea-error w-full`

    const className = error ? errorClassName : defaultClassName

    return (
        <fieldset className="fieldset">
            <Label label={label} />
            <textarea
                ref={ref}
                value={value ?? ''}
                {...inputProps}
                className={`${className} ${
                    props.className ? props.className : ''
                }`}
            />
            <TextInputError error={error} />
        </fieldset>
    )
})

export default TextareaInput
