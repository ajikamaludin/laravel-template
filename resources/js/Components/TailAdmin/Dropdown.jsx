import { useEffect, useRef, useState } from "react";

const Dropdown = ({ children, label, data = [], index = 0 }) => {
    const ref = useRef()
    const [isOpen, setOpen] = useState(false)

    const toggle = () => {
        console.log('cleckt')
        setOpen(!isOpen)
    }

    useEffect(() => {
        if (isOpen === true) {
            const checkIfClickedOutside = (e) => {
                if (isOpen && ref.current && !ref.current.contains(e.target)) {
                    setOpen(false)
                }
            }
            document.addEventListener('mousedown', checkIfClickedOutside)
            return () => {
                document.removeEventListener('mousedown', checkIfClickedOutside)
            }
        }
    }, [isOpen])

    return (
        <div ref={ref} className="relative">
            <button type="button" className="shadow float-right inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-black hover:text-primary dark:bg-meta-4 dark:text-white dark:shadow-none" onClick={toggle} >
                {label}
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" htmlfill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div className="relative h-full">
                    <div className={`min-w-20 shadow w-full rounded-[5px] bg-white py-2.5 dark:bg-boxdark  mt-1 block right-0 z-10 absolute  ${isOpen ? 'block' : 'hidden'} ${data.length === (index + 1) ? 'bottom-full' : 'top-full'}`} >
                    {children}
                    </div>
            </div>
        </div>
    );
};

Dropdown.Item = ({ children, ...props }) => {
    return (
        <div className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700" {...props}>
            {children}
        </div>
    );
};

export default Dropdown;