import React, { forwardRef } from 'react'

const Label = ({ label }) => {
    if (!label) return null

    return (
        <div className="label">
            <span className="label-text">{label}</span>
        </div>
    )
}

const BottomTextHelper = ({ error }) => {
    if (!error) return null

    return <p className="label-text text-red-600">{error}</p>
}

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
    const { label, error, ...inputProps } = props

    const defaultClassName = `textarea textarea-bordered w-full`

    const errorClassName = `textarea textarea-bordered textarea-error w-full`

    const className = error ? errorClassName : defaultClassName

    return (
        <div className="form-control">
            <Label label={label} />
            <textarea
                ref={ref}
                {...inputProps}
                className={`${className} ${
                    props.className ? props.className : ''
                }`}
            />
            <BottomTextHelper error={error} />
        </div>
    )
})

export default TextareaInput
