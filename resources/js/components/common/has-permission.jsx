import { hasPermission } from '@/utils'
import { usePage } from '@inertiajs/react'

export default function HasPermission({ p, children }) {
    const {
        props: { auth },
    } = usePage()

    const has = hasPermission(auth, p)

    if (has) {
        return children
    }
}
