import { usePage } from '@inertiajs/react'
import { useState, useEffect } from 'react'

export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])
    return debouncedValue
}

export function useModal(state = false) {
    const [isOpen, setIsOpen] = useState(state)
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const [data, setData] = useState(null)

    return {
        isOpen,
        toggle,
        setIsOpen,
        data,
        setData,
    }
}

export function usePagination(auth, r) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        data: [],
        links: [],
        from: 0,
        to: 0,
        total: 0,
        current_page: 1,
    })

    const fetch = (page = 1, params = {}) => {
        setLoading(true)
        axios
            .get(route(r, { page: page, ...params }), {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: auth.jwt_prefix + auth.jwt_token,
                },
            })
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return [data, fetch, loading]
}

export function useSelectApiPagination(auth, params, url = 'api.select.table') {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        data: [],
        links: [],
        from: 0,
        to: 0,
        total: 0,
        current_page: 1,
    })

    const fetch = (page = 1, additionalParams) => {
        setLoading(true)
        axios
            .get(
                route(url, {
                    page: page,
                    ...params,
                    ...additionalParams,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: auth.jwt_prefix + auth.jwt_token,
                    },
                }
            )
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return [data, fetch, loading]
}

export function useFetcher(url = null) {
    const {
        props: { auth },
    } = usePage()

    const fetch = (params) => {
        let dest = null

        if (typeof url === 'string') {
            dest = route(url, {
                page: 1,
                ...params,
            })
        } else {
            dest = params
        }

        return axios.get(dest, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: auth.jwt_prefix + auth.jwt_token,
            },
        })
    }

    return [fetch]
}

export function useSidebar(defaultOpen = true) {
    function isMobile() {
        return window.innerWidth <= 768
    }

    const STORAGE_KEY = 'sidebar'

    const [isOpen, setIsOpen] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        return isMobile()
            ? false
            : saved !== null
            ? JSON.parse(saved)
            : defaultOpen
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(isOpen))
    }, [isOpen])

    const toggleSidebar = () => setIsOpen((prev) => !prev)

    return {
        isShowSidebar: isOpen,
        toggleSidebar,
    }
}
