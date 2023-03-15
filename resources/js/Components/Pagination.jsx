import { router } from '@inertiajs/react'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import qs from 'qs'

const PageLink = ({ active, label, url, params }) => {
    const className = active ? 'z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'

    const onClick = () => {
        router.get(
            `${url}&${qs.stringify(params)}`,
            {},
            {
                replace: true,
                preserveState: true,
            }
        )
    }

    if (label === '&laquo; Previous') {
        return (
            <li>
                <button
                    onClick={onClick}
                    className="block py-2 px-1 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    aria-label="Previous"
                >
                    <HiOutlineChevronLeft className='w-5 h-5'/>
                </button>
            </li>
        )
    }
    if (label == 'Next &raquo;') {
        return (
            <li>
                <button
                    onClick={onClick}
                    className="block py-2 px-1 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <HiOutlineChevronRight className='w-5 h-5'/>
                </button>
            </li>
        )
    }

    return (
        <li>
            <button className={className} onClick={onClick}>
                { label }
            </button>
        </li>
    )
}

// Previous, if on first page
// Next, if on last page
// and dots, if exists (...)
const PageInactive = ({ label }) => {
    if (label === '&laquo; Previous') {
        return (
            <li>
                <button
                    className="block py-2 px-1 ml-0 leading-tight text-gray-500 bg-white border rounded-l-lg dark:bg-gray-800 border-gray-100 dark:text-gray-400 dark:border-gray-700"
                    disabled={true}
                    aria-label="Previous"
                >
                    <HiOutlineChevronLeft className='w-5 h-5 dark:text-gray-700 text-gray-300'/>
                </button>
            </li>
        )
    }
    if (label == 'Next &raquo;') {
        return (
            <li>
                <button
                    className="block py-2 px-1 leading-tight text-gray-500 bg-white border  rounded-r-lg dark:bg-gray-800 border-gray-100 dark:text-gray-400 dark:border-gray-700" 
                    disabled={true}
                    aria-label="Next"
                >
                    <HiOutlineChevronRight className='w-5 h-5 dark:text-gray-700 text-gray-300'/>
                </button>
            </li>
        )
    }
    return (
        <li>
            <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                {label}
            </button>
        </li>
    )
}

export default ({ links = [], params = null }) => {
    // dont render, if there's only 1 page (previous, 1, next)
    if (links.length === 3) return null
    return (
        <nav>
            <ul className="inline-flex items-center -space-x-px">
                {links.map(({ active, label, url }, index) => {
                    return url === null ? (
                        <PageInactive key={`${label}-${index}`} label={label} />
                    ) : (
                        <PageLink
                            key={label}
                            label={label}
                            active={active}
                            url={url}
                            params={params}
                        />
                    )
                })}
            </ul>
        </nav>
    )
}