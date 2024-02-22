import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { isEmpty } from "lodash";

import Modal from "@/Components/Preline/Modal";
import Button from "@/Components/Preline/Button";
import TextInput from "@/Components/Preline/TextInput";
import RoleSelectionInput from "../Role/SelectionInput";

export default function FormModal(props) {
    const { modalState } = props
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        role_id: null,
        role: '',
    })

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? (event.target.checked ? 1 : 0) : event.target.value);
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
        const user = modalState.data
        if(user !== null) {
            put(route('user.update', user), {
                onSuccess: () => handleClose(),
            })
            return
        } 
        post(route('user.store'), {
            onSuccess: () => handleClose()
        })
    }

    useEffect(() => {
        const user = modalState.data
        if (isEmpty(user) === false) {
            setData({
                name: user.name,
                email: user.email,
                role_id: user.role_id,
                role: user.role
            })
            return 
        }
    }, [modalState])

    return (
        <Modal
            isOpen={modalState.isOpen}
            toggle={handleClose}
            title={"User"}
        >
            <TextInput
                name="name"
                value={data.name}
                onChange={handleOnChange}
                label="name"
                error={errors.name}
            />
            <TextInput
                name="email"
                value={data.email}
                onChange={handleOnChange}
                label="email"
                error={errors.email}
            />
            <TextInput
                type="password"
                name="password"
                value={data.password}
                onChange={handleOnChange}
                label="Password"
                error={errors.password}
            />
            {data.role !== null && (
                <>
                    <RoleSelectionInput
                        label="Role"
                        itemSelected={data.role_id}
                        onItemSelected={(id) => setData('role_id', id)}
                        error={errors.role_id}
                    />
                </>
            )}
            <div className="flex items-center space-x-2">
                <Button
                    onClick={handleSubmit}
                    processing={processing}
                >
                    Simpan
                </Button>
                <Button
                    onClick={handleClose}
                    type="secondary"
                >
                    Batal
                </Button>
            </div>
        </Modal>
    )
}