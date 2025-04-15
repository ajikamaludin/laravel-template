import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2'

const PageLink = ({ active, label, page, onPageChange }) => {
    const className = active ? 'join-item btn btn-active' : 'join-item btn'

    if (label === '&laquo; Previous') {
        return (
            <button
                onClick={() => onPageChange(+page - 1)}
                className="join-item btn"
                aria-label="Previous"
            >
                <HiOutlineChevronLeft className="w-4 h-4" />
            </button>
        )
    }
    if (label == 'Next &raquo;') {
        return (
            <button
                onClick={() => onPageChange(+page + 1)}
                className="join-item btn"
            >
                <HiOutlineChevronRight className="w-4 h-4" />
            </button>
        )
    }

    return (
        <button className={className} onClick={() => onPageChange(label)}>
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

export default ({ links, page, onPageChange }) => {
    // dont render, if there's only 1 page (previous, 1, next)
    if (links.links.length === 3) return null
    return (
        <nav>
            <div className="inline-flex items-center">
                <div className="join">
                    {links.links.map(({ active, label, url }, index) => {
                        return url === null ? (
                            <PageInactive
                                key={`${label}-${index}`}
                                label={label}
                            />
                        ) : (
                            <PageLink
                                key={`${label}-${index}`}
                                label={label}
                                active={active}
                                page={page}
                                onPageChange={onPageChange}
                            />
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}
