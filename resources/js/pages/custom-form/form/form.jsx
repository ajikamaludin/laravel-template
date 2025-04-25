import React, { useEffect, useState } from 'react'
import { router, Head, Link, usePage } from '@inertiajs/react'
import { isEmpty } from 'lodash'
import { Plus, Trash } from 'lucide-react'

import AuthenticatedLayout from '@/layouts/default/authenticated-layout'
import {
    SelectOptionObject,
    TextInput,
    Button,
    Card,
    TextareaInput,
} from '@/components/index'
import { InputTypes, RequiredOptions } from '../constants'

export default function Form(props) {
    const {
        props: { errors, item },
    } = usePage()

    const [processing, setProcessing] = useState(false)

    const [name, setName] = useState('')
    const [fields, setFields] = useState([
        {
            name: '',
            type: InputTypes.text,
            required: RequiredOptions.no,
            id: crypto.randomUUID(),
        },
    ])

    const addFields = () => {
        setFields(
            fields.concat({
                name: '',
                type: InputTypes.text,
                required: RequiredOptions.no,
                id: crypto.randomUUID(),
            })
        )
    }

    const handleChangeFields = (key, value, index) => {
        setFields(
            fields.map((f, i) => {
                if (i === index) {
                    f[key] = value
                }
                return f
            })
        )
    }

    const removeField = (index) => {
        setFields(fields.filter((_, i) => i !== index))
    }

    const handleSubmit = () => {
        if (isEmpty(item) === false) {
            router.put(
                route('custom-form.forms.update', item),
                {
                    name: name,
                    fields: JSON.stringify(fields),
                },
                {
                    onStart: () => setProcessing(true),
                    onFinish: (e) => {
                        setProcessing(false)
                    },
                }
            )
            return
        }
        router.post(
            route('custom-form.forms.store', item),
            {
                name: name,
                fields: JSON.stringify(fields),
            },
            {
                onStart: () => setProcessing(true),
                onFinish: (e) => {
                    setProcessing(false)
                },
            }
        )
    }

    useEffect(() => {
        if (!isEmpty(item)) {
            setName(item.name)
            setFields(JSON.parse(item.fields))
        }
    }, [item])

    return (
        <AuthenticatedLayout
            title={'Custom Form'}
            breadcumbs={[
                { name: 'Module', href: route('dashboard') },
                {
                    name: 'Form',
                    href: item
                        ? route('custom-form.forms.edit', item.id)
                        : route('custom-form.forms.create'),
                },
            ]}
        >
            <Head title="Custom Form" />

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
                        <div
                            className={`w-full border rounded-md p-2 flex flex-col gap-2 ${
                                errors.fields
                                    ? 'border-red-600'
                                    : 'border-gray-600'
                            }`}
                        >
                            <div className="font-semibold">Form</div>
                            {fields.map((item, index) => (
                                <div
                                    className="border border-gray-600 p-2 rounded-md w-full flex flex-row gap-2"
                                    key={index}
                                >
                                    <div className="flex-1">
                                        <div className="w-full flex flex-col md:flex-row gap-2">
                                            <div className="w-full">
                                                <TextInput
                                                    name="name"
                                                    value={item.name}
                                                    onChange={(e) =>
                                                        handleChangeFields(
                                                            'name',
                                                            e.target.value,
                                                            index
                                                        )
                                                    }
                                                    label="Label"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <SelectOptionObject
                                                    label={'Type'}
                                                    onChange={(e) =>
                                                        handleChangeFields(
                                                            'type',
                                                            e.target.value,
                                                            index
                                                        )
                                                    }
                                                    value={item.type}
                                                    options={InputTypes}
                                                />
                                            </div>
                                            <div className="w-full">
                                                <SelectOptionObject
                                                    label={'Required'}
                                                    onChange={(e) =>
                                                        handleChangeFields(
                                                            'required',
                                                            e.target.value,
                                                            index
                                                        )
                                                    }
                                                    value={item.required}
                                                    options={RequiredOptions}
                                                />
                                            </div>
                                        </div>
                                        {['select', 'multiple'].includes(
                                            item.type
                                        ) && (
                                            <div>
                                                <TextareaInput
                                                    label="Opsi"
                                                    value={item.options}
                                                    onChange={(e) =>
                                                        handleChangeFields(
                                                            'options',
                                                            e.target.value,
                                                            index
                                                        )
                                                    }
                                                    placeholder="masukan opsi, pisahkan tiap opsi dengan koma ( , )
contoh: laki-laki,perempuan"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="btn-xs btn btn-ghost">
                                        <Trash
                                            className="w-4 h-4 text-red-500"
                                            onClick={() => removeField(index)}
                                        />
                                    </div>
                                </div>
                            ))}
                            {errors.fields && (
                                <p className="label-text text-red-600">
                                    {errors.fields}
                                </p>
                            )}
                            <div>
                                <Button
                                    className={'btn-sm btn-outline'}
                                    onClick={addFields}
                                >
                                    <Plus className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex space-x-2">
                                <Button
                                    onClick={handleSubmit}
                                    processing={processing}
                                    type="primary"
                                >
                                    Simpan
                                </Button>
                                <Link href={route('custom-form.forms.index')}>
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
