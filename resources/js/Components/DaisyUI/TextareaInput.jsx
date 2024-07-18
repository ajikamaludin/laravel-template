import React, { forwardRef } from 'react'

const Label = ({ label }) => {
    if (!label) return null

    return <label className="label-text">{label}</label>
}

const BottomTextHelper = ({ error }) => {
    if (!error) return null

    return <p className="label-text text-red-600">{error}</p>
}

const TextareaInput = forwardRef((props, ref) => {
    const { label, error, ...inputProps } = props

    const defaultClassName = `textarea textarea-bordered w-full`

    const errorClassName = `textarea textarea-bordered textarea-error w-full`

    const className = error ? errorClassName : defaultClassName

    return (
        <div>
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
