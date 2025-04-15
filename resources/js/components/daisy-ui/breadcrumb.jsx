const Breadcrumb = (props) => {
    return (
        <div className="breadcrumbs text-sm px-4 border-base-200 border-y">
            <ul>{props.children}</ul>
        </div>
    )
}

Breadcrumb.Item = ({ onClick, children }) => {
    return (
        <li onClick={onClick}>
            <p>{children}</p>
        </li>
    )
}

export default Breadcrumb
