import dayjs from 'dayjs'
import { toast } from 'sonner'
import { isEmpty } from 'lodash'

export const formatDate = (date) => {
    if (!isEmpty(date)) {
        return ''
    }
    return dayjs(date).format('DD/MM/YYYY')
}

export const formatDateTime = (date) => {
    if (!isEmpty(date)) {
        return ''
    }
    return dayjs(date).format('DD/MM/YYYY HH:mm:ss')
}

export const dateToString = (date) => {
    return dayjs(date).format('MM/DD/YYYY')
}

export const converToDate = (date) => {
    if (isEmpty(date) == false) {
        return new Date(date)
    }

    return ''
}

export function formatIDR(amount) {
    const idFormatter = new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })
    return idFormatter.format(amount)
}

export const formatIDDate = (date) => {
    const month = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ]
    date = new Date(date)

    return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`
}

export const hasPermission = (auth, permission) => {
    const { user } = auth
    if (user.role === null) {
        return true
    }

    let has = user.role.permissions.find((item) => item.name === permission)

    if (has) {
        return true
    }
    return false
}

export const showToast = (message, type) => {
    if (type === 'success') {
        toast.success(message)
        return
    }
    if (type === 'error') {
        toast.error(message)
        return
    }
    toast(message)
}
