import { forwardRef } from 'react'
import Label from './label'
import TextInputError from './text-input-error'

/**
 * Example :
 * <TextInput
 *     name={input.name}
 *     value={input.value}
 *     label={input.name}
 *     onChange={(e) => onChange(input, e.target.value)}
 * />
 *
 */
const TextInput = forwardRef((props, ref) => {
    const { label, error, ...inputProps } = props

    const defaultClassName = `w-full input`

    const errorClassName = `w-full input input-error`

    const className = error ? errorClassName : defaultClassName

    return (
        <fieldset className="fieldset">
            <Label label={label} />
            <input
                ref={ref}
                {...inputProps}
                className={`${className} ${
                    props.className ? props.className : ''
                }`}
            />
            <TextInputError error={error} />
        </fieldset>
    )
})

export default TextInput
