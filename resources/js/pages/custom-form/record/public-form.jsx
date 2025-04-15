import React, { useState } from 'react'
import { router, Head, usePage } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import CustomLayout from '@/layouts/default/custom-layout'
import { Button, Card } from '@/components/index'
import { showToast } from '@/utils'
import { RequiredOptions } from '../constants'
import { RenderFormInput } from './render-form-input'

export default function Form() {
    const {
        props: { field },
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

        router.post(
            route('custom-form.public', field),
            {
                fields: JSON.stringify(inputs),
            },
            {
                onStart: () => setProcessing(true),
                onFinish: (e) => {
                    setProcessing(false)
                    setInputs(
                        inputs.map((i) => {
                            i['value'] = ''
                            return i
                        })
                    )
                },
            }
        )
        return
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

    return (
        <CustomLayout>
            <Head title={`Record - ${field.name}`} />

            <div className="w-full flex justify-center">
                <div className="w-full md:w-1/2 flex flex-col gap-5 px-2">
                    <Card>
                        <div className="flex flex-col gap-2 justify-between">
                            <div className="text-2xl font-bold mb-2">
                                {field.name}
                            </div>
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
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </CustomLayout>
    )
}
