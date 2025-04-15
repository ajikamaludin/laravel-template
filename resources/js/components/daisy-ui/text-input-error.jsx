export default function TextInputError({ error }) {
    if (!error) return null

    return <p className="fieldset-label text-error">{error}</p>
}
