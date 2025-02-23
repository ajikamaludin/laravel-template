export default function Label({ label }) {
    if (!label) return null

    return (
        <div className="label">
            <label className="label-text">{label}</label>
        </div>
    )
}
