import { router } from '@inertiajs/react'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2'
import qs from 'qs'

const PageLink = ({ active, label, url, params }) => {
    const className = active ? 'join-item btn btn-active' : 'join-item btn'

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
            <button
                onClick={onClick}
                className="join-item btn"
                aria-label="Previous"
            >
                <HiOutlineChevronLeft className="w-4 h-4" />
            </button>
        )
    }
    if (label == 'Next &raquo;') {
        return (
            <button onClick={onClick} className="join-item btn">
                <HiOutlineChevronRight className="w-4 h-4" />
            </button>
        )
    }

    return (
        <button className={className} onClick={onClick}>
            {label}
        </button>
    )
}

// Previous, if on first page
// Next, if on last page
// and dots, if exists (...)
const PageInactive = ({ label }) => {
    if (label === '&laquo; Previous') {
        return (
            <button
                className="join-item btn btn-disabled"
                aria-label="Previous"
            >
                <HiOutlineChevronLeft className="w-4 h-4 text-base-content" />
            </button>
        )
    }
    if (label == 'Next &raquo;') {
        return (
            <button className="join-item btn btn-disabled" aria-label="Next">
                <HiOutlineChevronRight className="w-4 h-4 text-base-content" />
            </button>
        )
    }
    return <button className="join-item btn btn-disabled">{label}</button>
}

export default ({ links = [], params = null }) => {
    // dont render, if there's only 1 page (previous, 1, next)
    if (links.length === 3) return null
    return (
        <nav>
            <div className="inline-flex items-center">
                <div className="join">
                    {links.map(({ active, label, url }, index) => {
                        return url === null ? (
                            <PageInactive
                                key={`${label}-${index}`}
                                label={label}
                            />
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
                </div>
            </div>
        </nav>
    )
}
