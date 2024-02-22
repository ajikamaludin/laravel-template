import React from "react";
import Modal from "./Modal";
import Button from "./Button";

import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ModalConfirm({ modalState, onConfirm }) {
    const onClickConfirm = () => {
        onConfirm()
        modalState.toggle()
    }
    
    const onCancel = () => {
        modalState.setData(null)
        modalState.toggle()
    }

    return (
        <Modal
            maxW="md"
            isOpen={modalState.isOpen}
            toggle={modalState.toggle}
        >
                <div className="text-center text-gray-800 dark:text-gray-200">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 " />
                    <h3 className="mb-5 text-lg font-normal ">
                        Are you sure ?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button
                            type="red"
                            onClick={onClickConfirm}
                        >
                            Yes
                        </Button>
                        <Button
                            type="secondary"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
        </Modal>
    )
}