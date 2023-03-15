import { useState, useEffect } from "react";

export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

export function useModalState(state = false) {
    const [isOpen, setIsOpen] = useState(state);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const [data, setData] = useState(null);

    return {
        isOpen,
        toggle,
        setIsOpen,
        data,
        setData,
    };
}

export function usePagination(auth, r) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        data: [],
        links: [],
        from: 0,
        to: 0,
        total: 0
    })

    const page = data.links.find(link => link.active === true)

    const fetch = (page = 1, params = {}) => {
        setLoading(true)
        axios
            .get(route(r, { page: page, ...params }), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth.user.jwt_token,
                },
            })
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    };

    return [data.data, data, page?.label, fetch, loading]
}