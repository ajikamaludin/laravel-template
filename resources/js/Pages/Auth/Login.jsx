import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/Defaults/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, TextInput,Label, Checkbox, Spinner } from 'flowbite-react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const handleKeyDown = e => {
        if(e.code === 'Enter') {
            post(route('login'))
        }
    }

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <Label value="Email" />

                    <TextInput
                        type="text"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        autoFocus={true}
                        onChange={onHandleChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label value="Password" />

                    <TextInput
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={onHandleChange}
                        onKeyDownCapture={e => handleKeyDown(e)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center space-x-2">
                        <Checkbox id="remember" value={data.remember} onChange={onHandleChange}/>
                        <Label htmlFor="remember">
                        Remember me
                        </Label>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button onClick={submit} disabled={processing}>
                        {processing ? (
                            <Spinner/>
                        ) : ('Log in')}
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
