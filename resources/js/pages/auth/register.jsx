import React, { useEffect } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'

import GuestLayout from '@/layouts/default/guest-layout'
import { TextInput, Button } from '@/components/index'

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation')
        }
    }, [])

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
        )
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('register'))
    }

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <TextInput
                        label="Name"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={onHandleChange}
                        error={errors.name}
                    />
                </div>

                <div>
                    <TextInput
                        label="Email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={onHandleChange}
                        error={errors.email}
                    />
                </div>

                <div>
                    <TextInput
                        label="Password"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={onHandleChange}
                        error={errors.password}
                    />
                </div>

                <div>
                    <TextInput
                        label="Confirm Password"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={onHandleChange}
                        error={errors.password_confirmation}
                    />
                </div>

                <div className="flex items-center justify-end mt-4 gap-1">
                    <Link href={route('login')} className="link">
                        Already registered?
                    </Link>

                    <Button
                        className="ml-4"
                        processing={processing}
                        onClick={submit}
                        type="primary"
                    >
                        Register
                    </Button>
                </div>
            </form>
        </GuestLayout>
    )
}
