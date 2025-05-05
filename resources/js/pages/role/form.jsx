import React, { useEffect, useState } from 'react'
import { router, Head, Link, usePage } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import AuthenticatedLayout from '@/layouts/default/authenticated-layout'
import { TextInput, Button, Checkbox, Card, Label } from '@/components/index'

export default function Role(props) {
    const {
        props: { errors },
    } = usePage()
    const { permissions, role } = props

    const [processing, setProcessing] = useState(false)

    const [name, setName] = useState('')
    const [permins, setPermins] = useState(permissions)

    const handleCheckPermission = (g, n) => {
        setPermins(
            Object.fromEntries(
                Object.entries(permins).map(([group, items]) => [
                    group,
                    items.map((item) => ({
                        ...item,
                        checked:
                            g === group && item.name === n
                                ? !item.checked
                                : item.checked,
                    })),
                ])
            )
        )
    }

    const handleCheckAll = (checked) => {
        console.log(checked)
        setPermins(
            Object.fromEntries(
                Object.entries(permins).map(([group, items]) => [
                    group,
                    items.map((item) => ({
                        ...item,
                        checked: checked,
                    })),
                ])
            )
        )
    }

    const handleCheckGroup = (g, e) => {
        setPermins(
            Object.fromEntries(
                Object.entries(permins).map(([group, items]) => [
                    group,
                    items.map((item) => ({
                        ...item,
                        checked: g === group ? e.target.checked : item.checked,
                    })),
                ])
            )
        )
    }

    const handleSubmit = () => {
        const payload = {
            name: name,
            permissions: Object.values(permins)
                .flat()
                .filter((item) => item.checked),
        }

        if (isEmpty(role) === false) {
            router.put(route('roles.update', role), payload, {
                onStart: () => setProcessing(true),
                onFinish: (e) => {
                    setProcessing(false)
                },
            })
            return
        }
        router.post(route('roles.store'), payload, {
            onStart: () => setProcessing(true),
            onFinish: (e) => {
                setProcessing(false)
            },
        })
    }

    useEffect(() => {
        if (!isEmpty(role)) {
            setName(role.name)
            setPermins(
                Object.fromEntries(
                    Object.entries(permissions).map(([group, items]) => [
                        group,
                        items.map((item) => {
                            return {
                                ...item,
                                checked:
                                    role.permissions.find(
                                        (permit) => permit.name === item.name
                                    ) !== undefined,
                            }
                        }),
                    ])
                )
            )
        }
    }, [role])

    return (
        <AuthenticatedLayout
            title={'Role'}
            breadcumbs={[
                { name: 'Dashboard', href: route('dashboard') },
                { name: 'Roles', href: route('roles.index') },
                {
                    name: 'Form',
                    href: role
                        ? route('roles.edit', role)
                        : route('roles.create'),
                },
            ]}
        >
            <Head title="Role" />

            <div>
                <Card>
                    <div className="flex flex-col gap-2 justify-between">
                        <TextInput
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label="Name"
                            error={errors.name}
                        />
                        <Checkbox
                            label={'Check All'}
                            onChange={(e) => handleCheckAll(e.target.checked)}
                        />
                        <div
                            className={`flex flex-col border border-rounded border-gray-400 rounded-lg p-2 gap-2 ${
                                errors.permissions
                                    ? 'border-red-600'
                                    : 'border-gray-400'
                            }`}
                        >
                            {Object.keys(permins).map((group) => (
                                <div
                                    key={group}
                                    className="flex flex-col gap-2 rounded border border-gray-400 p-2"
                                >
                                    <div className="flex items-center space-x-3">
                                        <Checkbox
                                            id={`check-${group}`}
                                            onChange={(e) =>
                                                handleCheckGroup(group, e)
                                            }
                                        />
                                        <Label label={group} />
                                    </div>
                                    <div
                                        className={`grid grid-cols-1 gap-2 md:grid-cols-4 ${
                                            errors.permissions
                                                ? 'border-red-600'
                                                : 'border-gray-400 dark:border-gray-700'
                                        }`}
                                    >
                                        {permins[group].map((item) => (
                                            <div
                                                className="flex items-center space-x-3"
                                                key={item.id}
                                            >
                                                <Checkbox
                                                    id={item.label}
                                                    onChange={() =>
                                                        handleCheckPermission(
                                                            group,
                                                            item.name
                                                        )
                                                    }
                                                    key={item.id}
                                                    label={item.label}
                                                    value={item.checked}
                                                    name={item.name}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {errors.permissions && (
                            <p className="mb-2 text-sm text-red-600 dark:text-red-500">
                                {errors.permissions}
                            </p>
                        )}
                        <div className="flex items-center">
                            <div className="flex space-x-2">
                                <Button
                                    onClick={handleSubmit}
                                    processing={processing}
                                    type="primary"
                                >
                                    Simpan
                                </Button>
                                <Link href={route('roles.index')}>
                                    <Button type="secondary">Kembali</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    )
}
