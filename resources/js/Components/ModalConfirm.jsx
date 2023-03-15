import React from "react";
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ModalConfirm({ modalState, onConfirm }){
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
            show={modalState.isOpen}
            size="md"
            popup={true}
            onClose={modalState.toggle}
        >
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure ?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button
                            color="failure"
                            onClick={onClickConfirm}
                        >
                            Yes
                        </Button>
                        <Button
                            color="gray"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}