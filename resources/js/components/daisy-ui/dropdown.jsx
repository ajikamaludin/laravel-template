import { isEmpty } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { EllipsisVertical } from 'lucide-react'

const Dropdown = ({ children, label }) => {
    const ref = useRef()
    const [isOpen, setOpen] = useState(false)

    useEffect(() => {
        if (isOpen === true) {
            const checkIfClickedOutside = (e) => {
                if (ref.current) {
                    ref.current.open = false
                }
            }
            document.addEventListener('click', checkIfClickedOutside)
            return () => {
                document.removeEventListener('click', checkIfClickedOutside)
            }
        }
    }, [isOpen])

    return (
        <details
            className={`dropdown dropdown-left dropdown-end`}
            ref={ref}
            onClick={() => setOpen(true)}
        >
            <summary
                role="button"
                className="btn px-3"
            >
                {isEmpty(label) ? (
                    <EllipsisVertical className="w-5 h-5" />
                ) : (
                    <div>{label}</div>
                )}
            </summary>
            <ul className="p-2 shadow-sm menu dropdown-content z-1 bg-base-300 rounded-box w-52">
                {children}
            </ul>
        </details>
    )
}

Dropdown.Item = ({ children, ...props }) => {
    return <li {...props}>{children}</li>
}

export default Dropdown
