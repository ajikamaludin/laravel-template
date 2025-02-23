import { HiXMark } from 'react-icons/hi2'

export default function Modal({
    children,
    title = '',
    isOpen,
    onClose,
    size = 'md',
}) {
    const sizes = {
        sm: 'md:max-w-sm',
        md: 'md:max-w-md',
        lg: 'md:max-w-xl',
        xl: 'md:max-w-5xl',
    }

    return (
        <dialog
            className={`w-full modal modal-bottom md:modal-middle ${
                isOpen ? 'modal-open' : ''
            }`}
        >
            <div className={`modal-box md:w-11/12 ${sizes[size]}`}>
                {title && <h3 className="font-bold text-lg">{title}</h3>}
                <form method="dialog">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={onClose}
                    >
                        <HiXMark className="h-5 w-5" />
                    </button>
                </form>
                <div className="w-full">{children}</div>
            </div>
        </dialog>
    )
}
