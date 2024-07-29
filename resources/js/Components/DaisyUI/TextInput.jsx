import React, { forwardRef } from 'react'

const Label = ({ label }) => {
    if (!label) return null

    return (
        <div className="label">
            <label className="label-text">{label}</label>
        </div>
    )
}

const BottomTextHelper = ({ error }) => {
    if (!error) return null

    return <p className="label-text text-red-600">{error}</p>
}

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

    const defaultClassName = `input input-bordered w-full`

    const errorClassName = `input input-bordered input-error w-full`

    const className = error ? errorClassName : defaultClassName

    return (
        <div className="form-control">
            <Label label={label} />
            <input
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

export default TextInput
