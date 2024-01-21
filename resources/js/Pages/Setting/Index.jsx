import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import TextInput from '@/Components/Preline/TextInput'
import Button from '@/Components/Preline/Button'
import { Head, useForm } from '@inertiajs/react'
import { isEmpty } from 'lodash'

const extractValue = (set, key) => {
    const find = set.find((s) => s.key === key)
    if (isEmpty(find) === false) {
        if (find.type === 'image') {
            return find?.url
        }
        return find?.value
    }
    return ''
}

export default function Setting(props) {
    const { setting } = props

    const { data, setData, post, processing, errors } = useForm({
        app_name: extractValue(setting, 'app_name'),
    })

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                    ? 1
                    : 0
                : event.target.value
        )
    }

    const handleSubmit = () => {
        post(route('setting.update'))
    }

    return (
        <AuthenticatedLayout
            page={'Setting'}
            action={['Index']}
        >
            <Head title="Setting" />

            <div>
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden p-4 shadow-sm border rounded-lg bg-white dark:bg-slate-800 dark:border-gray-700 dark:shadow-slate-700/[.7] flex flex-col">
                        <div className="text-xl font-bold mb-4 dark:text-white">Setting</div>
                        <TextInput
                            name="app_name"
                            value={data.app_name}
                            onChange={handleOnChange}
                            label="App Name"
                            error={errors.app_name}
                        />
                        <div className="mt-4">
                            <Button
                                onClick={handleSubmit}
                                processing={processing}
                            >
                                Simpan
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
