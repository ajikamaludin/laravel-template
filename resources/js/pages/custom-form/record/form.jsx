import React, { useEffect, useState } from 'react'
import { router, Head, Link, usePage } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import AuthenticatedLayout from '@/layouts/default/authenticated-layout'
import { Button, Card } from '@/components/index'
import { showToast } from '@/utils'
import { RequiredOptions } from '../constants'
import { RenderFormInput } from './render-form-input'

export default function Form() {
    const {
        props: { field, item },
    } = usePage()

    const [inputs, setInputs] = useState(JSON.parse(field.fields))
    const [processing, setProcessing] = useState(false)

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
        <AuthenticatedLayout
            title={'Custom Form'}
            breadcumbs={[
                { name: 'Custom Form', href: route('custom-form.forms.index') },
                {
                    name: `Form - ${field.name}`,
                    href: route('custom-form.form-records.index', field),
                },
            ]}
        >
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
