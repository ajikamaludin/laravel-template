import Spinner from './spinner'

export default function Button(props) {
    const { type } = props

    const types = {
        default: 'btn-soft',
        neutral: 'btn-neutral btn-soft',
        primary: 'btn-primary btn-soft',
        secondary: 'btn-secondary btn-soft',
        accent: 'btn-accent btn-soft',
        ghost: 'btn-ghost',
        link: 'btn-link',
        //
        info: 'btn-info btn-soft',
        error: 'btn-error btn-soft',
        success: 'btn-success btn-soft',
        warning: 'btn-warning btn-soft',
    }

    return (
        <button
            type="button"
            disabled={props.disabled || props.processing || false}
            onClick={props.onClick}
            className={`btn ${!type ? types.default : types[type]} ${
                props.className ? props.className : ''
            }`}
        >
            {props.processing ? (
                <>
                    <Spinner />
                    Loading
                </>
            ) : (
                props.children
            )}
        </button>
    )
}
