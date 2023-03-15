import React, { useEffect } from "react";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import Button from "@/Components/Button";
import FormInput from "@/Components/FormInput";
import RoleSelectionInput from "../Role/SelectionInput";
import EmployeeSelectionInput from "../Employee/SelectionInput";

import { isEmpty } from "lodash";
import Checkbox from "@/Components/Checkbox";

export default function FormModal(props) {
    const { modalState } = props
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        username: '',
        password: '',
        role_id: null,
        employee_id: null,
        is_superadmin: 0,
        is_enable: 0
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
                username: user.username,
                role_id: user.role_id,
                employee_id: user.employee_id,
                is_superadmin: user.is_superadmin,
                is_enable: user.is_enable
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
            <FormInput
                name="username"
                value={data.username}
                onChange={handleOnChange}
                label="Username"
                error={errors.username}
            />
            <FormInput
                type="password"
                name="password"
                value={data.password}
                onChange={handleOnChange}
                label="Password"
                error={errors.password}
            />
            {+data.is_superadmin === 0 && (
                <>
                    <RoleSelectionInput
                        label="Role"
                        itemSelected={data.role_id}
                        onItemSelected={(id) => setData('role_id', id)}
                        error={errors.role_id}
                    />
                    <EmployeeSelectionInput
                        label="Karyawan"
                        itemSelected={data.employee_id}
                        onItemSelected={(id) => setData('employee_id', id)}
                        error={errors.employee_id}
                    />
                </>
            )}
            <Checkbox
                label='Aktif'
                value={+data.is_enable === 1}
                onChange={handleOnChange}
                name='is_enable'
            />
            <div className="flex items-center">
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