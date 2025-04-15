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

export function useModalState(state = false) {
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
