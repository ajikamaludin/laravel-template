import React, { useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import { isEmpty } from 'lodash'

import Modal from '@/Components/DaisyUI/Modal'
import Button from '@/Components/DaisyUI/Button'
import TextInput from '@/Components/DaisyUI/TextInput'
import Checkbox from '@/Components/DaisyUI/Checkbox'

export default function FormModal(props) {
    const { modalState } = props
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            name: '',
            link: '',
            code: '',
            bot_protection: '',
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
        const link = modalState.data
        if (link !== null) {
            put(route('shortlink.link.update', link), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('shortlink.link.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const link = modalState.data
        if (isEmpty(link) === false) {
            setData({
                name: link.name,
                link: link.real_link,
                code: link.code,
                bot_protection: link.bot_protection,
            })
            return
        }
    }, [modalState])

    return (
        <Modal
            isOpen={modalState.isOpen}
            onClose={handleClose}
            title={'Shortlink'}
        >
            <div className="form-control space-y-2.5">
                <TextInput
                    name="name"
                    value={data.name}
                    onChange={handleOnChange}
                    label="Name"
                    error={errors.name}
                />

                <TextInput
                    name="link"
                    value={data.link}
                    onChange={handleOnChange}
                    label="URL"
                    error={errors.link}
                />
                {!isEmpty(modalState.data) && (
                    <TextInput
                        name="code"
                        value={data.code}
                        onChange={handleOnChange}
                        label="Kode"
                        error={errors.code}
                    />
                )}
                <Checkbox
                    name="bot_protection"
                    value={+data.bot_protection === 1}
                    onChange={handleOnChange}
                    label="Bot Protection"
                    error={errors.bot_protection}
                />
            </div>
            <div className="flex items-center space-x-2 mt-4">
                <Button
                    onClick={handleSubmit}
                    processing={processing}
                    type="primary"
                >
                    Simpan
                </Button>
                <Button onClick={handleClose} type="secondary">
                    Batal
                </Button>
            </div>
        </Modal>
    )
}
