import React from 'react'
import Spinner from './Spinner';


export default function Button(props) {
    const { type } = props

    const types = {
        default: "py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600",
        secondary: "py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-500 text-white hover:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
    };

    return (
        <button 
            type="button"
            disabled={props.disabled || props.processing || false}
            onClick={props.onClick}
            className={!type ? types.default : types[type]}
        >
            {props.processing ? (
                <>
                    <Spinner/>
                    Loading
                </>
            ) : 
                props.children
            }
        </button>
    )
}