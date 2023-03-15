export default function InputError({ message, className = '' }) {
    return message ? <p className={'text-sm text-red-600 dark:text-red-800' + className}>{message}</p> : null;
}
