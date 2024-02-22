import { useState } from "react";

const Dropdown = ({ children, label }) => {
    const [isOpen, setOpen] = useState(false)

    const toggle = () => {setOpen(!isOpen)}

    return (
        <div className="relative inline-flex">
            <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={toggle}>
                {label}
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" htmlfill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>

            <div className={`min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700  ${isOpen ? 'absolute right-0 top-full z-1' : 'hidden opacity-0'}`} style={{inset: 'auto', transform: 'translate(0px, 36px,0px, 50px)'}}>
                {/* block */}
                {children}
            </div>
        </div>
    );
};

Dropdown.Item = ({ children }) => {
    return (
        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700" href="#">
            {children}
        </a>
    );
};

export default Dropdown;