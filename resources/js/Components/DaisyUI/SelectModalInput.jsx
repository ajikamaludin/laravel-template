import { useState } from 'react'
import Modal from './Modal'

// this component is still in TODO
export default function SelectModalInput() {
    const [isOpen, setOpen] = useState()

    // TODO : if it posible please use PaginationApi

    return (
        <>
            <input onClick={setOpen(!isOpen)} />
            <Modal isOpen={isOpen} onClose={() => setOpen(false)}></Modal>
        </>
    )
}
