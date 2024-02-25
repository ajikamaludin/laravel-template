import React, { useEffect } from 'react'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, useForm } from '@inertiajs/react'
import TextInput from '@/Components/Preline/TextInput'
import Checkbox from '@/Components/Preline/Checkbox'
import Button from '@/Components/Preline/Button'

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    })

    useEffect(() => {
        return () => {
            reset('password')
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

    const handleKeyDown = (e) => {
        if (e.code === 'Enter') {
            post(route('login'))
        }
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('login'))
    }

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <TextInput 
                        type="text"
                        label="Email"
                        name="email"
                        placeholder="you@site.com"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        autoFocus={true}
                        onChange={onHandleChange}
                        error={errors.email}
                    />
                </div>

                <div className="mt-4">
                    <TextInput 
                        type="password"
                        label="Password"
                        name="password"
                        placeholder="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        onChange={onHandleChange}
                        error={errors.password}
                        onKeyDownCapture={handleKeyDown}
                    />
                </div>

                <div className="block mt-4">
                    <Checkbox
                        label="Remember me"
                        name="remember"
                        value={data.remember}
                        onChange={onHandleChange}
                        error={errors.remember}
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button onClick={submit} processing={processing}>Log in</Button>
                </div>
            </form>
        </GuestLayout>
    )
}
