import React from 'react'

const Breadcrumb = (props) => {
    return (
        <ol className="flex items-center whitespace-nowrap py-3 px-4 w-full border-y border-gray-200 dark:border-gray-700" aria-label="Breadcrumb">
            {props.children}
        </ol>
    )
}

const BreadcrumbItem = (props) => {
    return (
        <li className="inline-flex items-center">
            <p 
                className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:focus:text-blue-500" 
                onClick={props?.onClick || null}
            >
                {props?.icon && <props.icon className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-600 mx-2" aria-hidden="true" />}
                {props?.children}
            </p>
            <svg className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round"/>
            </svg>
        </li>
    )
}

export {
    Breadcrumb,
    BreadcrumbItem
}