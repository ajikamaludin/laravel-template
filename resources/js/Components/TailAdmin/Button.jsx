import React from 'react'
import Spinner from './Spinner';


export default function Button(props) {
    const { type } = props

    const types = {
        default: "items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10",
        secondary: "items-center justify-center rounded-md bg-stroke text-black dark:bg-black py-4 px-10 text-center font-medium dark:text-white hover:bg-opacity-90 lg:px-8 xl:px-10",
        red: "items-center justify-center rounded-md bg-danger py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
    };

    return (
        <button 
            type="button"
            disabled={props.disabled || props.processing || false}
            onClick={props.onClick}
            className={(!type ? types.default : types[type]) + ' ' + props.className}
        >
            {props.processing ? (
                <div className='flex flex-row items-center justify-center space-x-2'>
                    <Spinner/>
                    <span>Loading</span>
                </div>
            ) : 
                props.children
            }
        </button>
    )
}