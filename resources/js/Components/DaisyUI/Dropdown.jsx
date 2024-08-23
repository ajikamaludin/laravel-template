import { isEmpty } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { HiEllipsisVertical } from 'react-icons/hi2'

const Dropdown = ({ children, label }) => {
    const ref = useRef()
    const [isOpen, setOpen] = useState(false)

    useEffect(() => {
        if (isOpen === true) {
            const checkIfClickedOutside = (e) => {
                if (ref.current && !ref.current.contains(e.target)) {
                    ref.current.open = false
                }
            }
            document.addEventListener('mousedown', checkIfClickedOutside)
            return () => {
                document.removeEventListener('mousedown', checkIfClickedOutside)
            }
        }
    }, [isOpen])

    return (
        <details
            className={`dropdown dropdown-left dropdown-end`}
            ref={ref}
            onClick={() => setOpen(true)}
        >
            <summary role="button" className="btn px-4">
                {isEmpty(label) ? (
                    <HiEllipsisVertical className="h-5 w-5" />
                ) : (
                    <div>{label}</div>
                )}
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box w-52">
                {children}
            </ul>
        </details>
    )
}

Dropdown.Item = ({ children, ...props }) => {
    return <li {...props}>{children}</li>
}

export default Dropdown
