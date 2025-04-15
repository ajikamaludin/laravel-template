import { isEmpty } from '@/utils'

export default function Label({ label }) {
    if (isEmpty(label)) {
        return null
    }

    return <legend className="fieldset-legend">{label}</legend>
}
