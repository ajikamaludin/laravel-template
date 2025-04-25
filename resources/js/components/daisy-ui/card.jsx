const Card = ({ children }) => {
    return (
        <div className="card bg-base-100 shadow border border-base-300">
            <div className="card-body">{children}</div>
        </div>
    )
}

export default Card
