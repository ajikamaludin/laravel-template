import { Link } from '@inertiajs/react'

const Breadcrumb = (props) => {
    return (
        <div className="breadcrumbs text-sm hidden md:block">
            <ul>{props.children}</ul>
        </div>
    )
}

Breadcrumb.Item = ({ r, children }) => {
    if (r === null || r === undefined) {
        return (
            <li>
                <p>{children}</p>
            </li>
        )
    }

    return (
        <li>
            <Link href={r}>
                <p>{children}</p>
            </Link>
        </li>
    )
}

export default Breadcrumb
