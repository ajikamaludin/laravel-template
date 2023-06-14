import { usePage } from '@inertiajs/react'
import React from 'react'

export default function ApplicationLogo({ className }) {
    const {
        props: { app_name },
    } = usePage()

    return <h1 className={className}>{app_name}</h1>
}
