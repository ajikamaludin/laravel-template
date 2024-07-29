import { useEffect, useRef, useState } from 'react'

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
            <summary role="button" className="btn px-2.5">
                <div>{label}</div>
                <div>
                    <svg
                        className="size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        htmlfill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>
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
