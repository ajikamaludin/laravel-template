import React, { useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import { TextInput, Button, Modal } from '@/components/index'

export default function FormModal(props) {
    const { modalState } = props
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            name: '',
            label: '',
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

    const handleReset = () => {
        modalState.setData(null)
        reset()
        clearErrors()
    }

    const handleClose = () => {
        handleReset()
        modalState.toggle()
    }

    const handleSubmit = () => {
        const permission = modalState.data
        if (permission !== null) {
            put(route('permissions.update', permission), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('permissions.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const permission = modalState.data
        if (isEmpty(permission) === false) {
            setData({
                name: permission.name,
                label: permission.label,
            })
            return
        }
    }, [modalState])

    return (
        <Modal
            isOpen={modalState.isOpen}
            onClose={handleClose}
            title={'Permission'}
        >
            <div className="form-control space-y-2.5">
                <TextInput
                    name="name"
                    value={data.name}
                    onChange={handleOnChange}
                    label="Name"
                    placeholder="permission-name"
                    error={errors.name}
                />
                <TextInput
                    name="label"
                    value={data.label}
                    onChange={handleOnChange}
                    label="Label"
                    placeholder="Permission Label"
                    error={errors.label}
                />

                <div className="flex items-center space-x-2 mt-4">
                    <Button
                        onClick={handleSubmit}
                        processing={processing}
                        type="primary"
                    >
                        Save
                    </Button>
                    <Button onClick={handleClose} type="secondary">
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
