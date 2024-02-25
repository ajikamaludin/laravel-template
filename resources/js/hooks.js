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
    })

    const page = data.links.find((link) => link.active === true)

    const fetch = (page = 1, params = {}) => {
        setLoading(true)
        axios
            .get(route(r, { page: page, ...params }), {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.user.jwt_token,
                },
            })
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return [data.data, data, page?.label, fetch, loading]
}

export function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass  initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key)
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            // If error also return initialValue
            console.log(error)
            return initialValue
        }
    })

    // useEffect to update local storage when the state changes
    useEffect(() => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                typeof storedValue === 'function'
                    ? storedValue(storedValue)
                    : storedValue
            // Save state
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error)
        }
    }, [key, storedValue])

    return [storedValue, setStoredValue]
}

export const useColorMode = () => {
    const [colorMode, setColorMode] = useLocalStorage('theme', 'light')

    useEffect(() => {
        const className = 'dark'
        const bodyClass = window.document.body.classList

        colorMode === 'dark'
            ? bodyClass.add(className)
            : bodyClass.remove(className)
    }, [colorMode])

    return [colorMode, setColorMode]
}
