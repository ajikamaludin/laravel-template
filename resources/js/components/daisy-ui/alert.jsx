import { CircleX } from 'lucide-react'

export default function Alert({ type = 'error', message }) {
    if (!message) {
        return null
    }

    const className = {
        success: `alert alert-success alert-soft`,
        error: `alert alert-error alert-soft`,
        info: `alert alert-info alert-soft`,
    }

    return (
        <div className={className[type]}>
            <CircleX />
            <span>{message}</span>
        </div>
    )
}
