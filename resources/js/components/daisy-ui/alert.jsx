import { HiXCircle } from 'react-icons/hi2'

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
            <HiXCircle className="h-5 w-5" />
            <span>{message}</span>
        </div>
    )
}
