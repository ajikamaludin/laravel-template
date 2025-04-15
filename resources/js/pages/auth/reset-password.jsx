import React, { useEffect } from 'react'
import { Head, useForm } from '@inertiajs/react'

import GuestLayout from '@/layouts/default/guest-layout'
import { TextInput, Button } from '@/components/index'

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    })

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation')
        }
    }, [])

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('password.store'))
    }

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <form onSubmit={submit}>
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

                <div className="flex items-center justify-end mt-4">
                    <Button
                        className="ml-4"
                        processing={processing}
                        onClick={submit}
                    >
                        Reset Password
                    </Button>
                </div>
            </form>
        </GuestLayout>
    )
}
