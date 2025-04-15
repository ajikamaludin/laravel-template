import Modal from './modal'
import Button from './button'

import { HiOutlineExclamationCircle } from 'react-icons/hi2'

export default function ModalConfirm({ onConfirm, modalState }) {
    const onClickConfirm = () => {
        onConfirm()
        modalState.toggle()
    }

    const onCancel = () => {
        modalState.setData(null)
        modalState.toggle()
    }

    return (
        <Modal isOpen={modalState.isOpen} onClose={onCancel}>
            <div className="text-center text-content">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 " />
                <h3 className="mb-5 text-lg font-normal ">Are you sure ?</h3>
                <div className="flex justify-center gap-4">
                    <Button type="error" onClick={onClickConfirm}>
                        Yes
                    </Button>
                    <Button type="info" onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
