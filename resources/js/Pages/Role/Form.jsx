import React, { useEffect, useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FormInput from '@/Components/FormInput';
import Button from '@/Components/Button';
import { isEmpty } from 'lodash';
import Checkbox from '@/Components/Checkbox';
import { router } from '@inertiajs/react';

export default function Role(props) {
    const { props: { errors } } = usePage()
    const { permissions, role } = props

    const [processing, setProcessing] = useState(false)
    

    const [name, setName] = useState('')
    const [permins, setPermins] = useState(permissions.map(permin => { return {...permin, checked: false} }))

    const handleCheckPermission = (e) => {
        setPermins(permins.map(item => {
            if(item.name === e.target.name) {
                return {
                    ...item,
                    checked: !item.checked
                }
            }  
            return item
        }))
    }

    const handleCheckAll = (e) => {
        setPermins(permins.map(item => {
            return {
                ...item,
                checked: e.target.checked,
            }
        }))
    }

    const handleSubmit = () => {
        if(isEmpty(role) === false) {
            router.put(route('roles.update', role), {
                name: name,
                permissions: permins.filter(item => item.checked)
            }, {
                onStart: () => setProcessing(true),
                onFinish: (e) => {
                    setProcessing(false)
                }
            })
            return
        } 
        router.post(route('roles.store'), {
            name: name,
            permissions: permins.filter(item => item.checked)
        }, {
            onStart: () => setProcessing(true),
            onFinish: (e) => {
                setProcessing(false)
            }
        })
    }

    useEffect(() => {
        if(!isEmpty(role)) {
            setName(role.name)
            setPermins(permins.map(item => {
                const isExists = role.permissions.find(permit => permit.id === item.id)
                if (isExists) {
                    return {
                        ...item,
                        checked: true,
                    }
                }
                return item 
            }))
        }
    }, [role])

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            flash={props.flash}
            page={'System'}
            action={'Role'}
        >
            <Head title="Role" />

            <div>
                <div className="mx-auto sm:px-6 lg:px-8 ">
                    <div className="p-6 shadow-sm sm:rounded-lg bg-gray-200 dark:bg-gray-800 space-y-4">
                        <FormInput
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            label="Nama"
                            error={errors.name}
                        />
                        <Checkbox
                            label={"Check All"}
                            onChange={handleCheckAll}
                        />
                        <div 
                            className={`grid grid-cols-1 md:grid-cols-4 border border-rounded border-gray-400 rounded-lg p-2 gap-2 ${errors.permissions ? 'border-red-600' : 'border-gray-400'}`}
                        >
                            {permins.map(item => (
                                <Checkbox
                                    key={item.id}
                                    label={item.label}
                                    value={item.checked}
                                    name={item.name}
                                    onChange={handleCheckPermission}
                                />
                            ))}
                        </div>
                        {errors.permissions && (
                            <p className="mb-2 text-sm text-red-600 dark:text-red-500">{errors.permissions}</p>
                        )}
                        <div className="flex items-center">
                        <Button
                            onClick={handleSubmit}
                            processing={processing} 
                        >
                            Simpan
                        </Button>
                        <Link href={route('roles.index')}>
                            <Button
                                type="secondary"
                            >
                                Kembali
                            </Button>
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
