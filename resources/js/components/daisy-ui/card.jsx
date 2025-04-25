const Card = ({ children }) => {
    return (
        <div className="card bg-base-100 shadow">
            <div className="card-body">{children}</div>
        </div>
    )
}

export default Card
