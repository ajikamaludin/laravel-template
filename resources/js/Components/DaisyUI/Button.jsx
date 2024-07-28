import React from 'react'
import Spinner from './Spinner'

export default function Button(props) {
    const { type } = props

    const types = {
        default: 'btn-primary',
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        info: 'btn-info',
        error: 'btn-error',
    }

    return (
        <button
            type="button"
            disabled={props.disabled || props.processing || false}
            onClick={props.onClick}
            className={`btn ${!type ? types.default : types[type]} ${
                props.className
            }`}
        >
            {props.processing ? (
                <>
                    <Spinner />
                    Loading
                </>
            ) : (
                props.children
            )}
        </button>
    )
}
