import React, { useEffect, useState } from 'react'
import { router, Head, Link, usePage } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import TextInput from '@/Components/DaisyUI/TextInput'
import Button from '@/Components/DaisyUI/Button'
import Checkbox from '@/Components/DaisyUI/Checkbox'
import Card from '@/Components/DaisyUI/Card'
import TextareaInput from '@/Components/DaisyUI/TextareaInput'
import { showToast } from '@/utils'
import { SelectOptionArray } from '@/Components/DaisyUI/SelectInput'
import { InputTypes, RequiredOptions } from '../constants'

const RenderFormInput = ({ input, onChange }) => {
    if (input.type === InputTypes.multiple) {
        return (
            <div className="form-control">
                <div className="label">
                    <span className="label-text">{input.name}</span>
                </div>
                <div className="w-full grid grid-cols-4 justify-between">
                    {input.options.split(',').map((opt) => (
                        <Checkbox
                            name={opt}
                            value={input.value === opt}
                            label={opt}
                            key={opt}
                            onChange={(e) =>
                                onChange(input, e.target.checked ? opt : '')
                            }
                        />
                    ))}
                </div>
            </div>
        )
    }

    if (input.type === InputTypes.checkbox) {
        return (
            <Checkbox
                name={input.name}
                value={+input.value === 1}
                label={input.name}
                onChange={(e) => onChange(input, e.target.checked ? 1 : 0)}
            />
        )
    }

    if (input.type === InputTypes.select) {
        return (
            <SelectOptionArray
                name={input.name}
                value={input.value}
                label={input.name}
                options={input.options.split(',')}
                onChange={(e) => onChange(input, e.target.value)}
            />
        )
    }

    if (input.type === InputTypes.textarea) {
        return (
            <TextareaInput
                name={input.name}
                value={input.value}
                label={input.name}
                onChange={(e) => onChange(input, e.target.value)}
            />
        )
    }

    return (
        <TextInput
            name={input.name}
            value={input.value}
            label={input.name}
            onChange={(e) => onChange(input, e.target.value)}
        />
    )
}

export default function Form(props) {
    const {
        props: { errors, field, item },
    } = usePage()

    const [inputs, setInputs] = useState(JSON.parse(field.fields))
    const [processing, setProcessing] = useState(false)

    console.log(inputs)

    const handleOnChange = (input, value) => {
        setInputs(
            inputs.map((i) => {
                if (input.id === i.id) {
                    i['value'] = value
                }
                return i
            })
        )
    }

    const handleSubmit = () => {
        if (!validate()) {
            return
        }

        if (isEmpty(item)) {
            router.post(
                route('custom-form.form-records.store', field),
                {
                    fields: JSON.stringify(inputs),
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

        router.put(
            route('custom-form.form-records.update', {
                form: field,
                formRecord: item,
            }),
            {
                fields: JSON.stringify(inputs),
            },
            {
                onStart: () => setProcessing(true),
                onFinish: (e) => {
                    setProcessing(false)
                },
            }
        )
    }

    const validate = () => {
        let checklist = inputs.map((input) => {
            if (
                isEmpty(input.value) &&
                input.required === RequiredOptions.yes
            ) {
                showToast(`${input.name} is required`, 'error')
                return false
            }
            return true
        })

        if (checklist.includes(false)) {
            return false
        }

        return true
    }

    useEffect(() => {
        if (isEmpty(item)) {
            return
        }

        const values = JSON.parse(item.fields)

        setInputs(
            inputs.map((input) => {
                const value = values.find((v) => v.id === input.id)
                if (!isEmpty(value)) {
                    input['value'] = value.value
                }
                return input
            })
        )
    }, [])

    return (
        <AuthenticatedLayout page={'Module'} action={field.name}>
            <Head title={`Record - ${field.name}`} />

            <div>
                <Card>
                    <div className="flex flex-col gap-2 justify-between">
                        {inputs.map((input) => (
                            <RenderFormInput
                                input={input}
                                key={input.name}
                                onChange={handleOnChange}
                            />
                        ))}
                        <div className="flex items-center">
                            <div className="flex space-x-2">
                                <Button
                                    onClick={handleSubmit}
                                    processing={processing}
                                    type="primary"
                                >
                                    Simpan
                                </Button>
                                <Link
                                    href={route(
                                        'custom-form.form-records.index',
                                        field
                                    )}
                                >
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
