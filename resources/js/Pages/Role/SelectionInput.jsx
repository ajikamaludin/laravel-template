import React, { useRef, useEffect, useState } from 'react'
import { useDebounce } from '@/hooks'
import { usePage } from '@inertiajs/react'
import axios from 'axios'
import { HiChevronDown, HiChevronUp, HiX } from 'react-icons/hi'
import { Spinner } from 'flowbite-react'

export default function SelectionInput(props) {
    const ref = useRef()
    const { props: { auth } } = usePage()

    const {
        label = '',
        itemSelected = null,
        onItemSelected = () => {},
        disabled = false,
        placeholder = '',
        error = '',
        all = 0,
    } = props

    const [showItems, setShowItem] = useState([])

    const [isSelected, setIsSelected] = useState(true)
    const [selected, setSelected] = useState(null)

    const [query, setQuery] = useState('')
    const q = useDebounce(query, 300)

    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const toggle = () => {
        setQuery('')
        setIsOpen(!isOpen)
    }

    const onInputMouseDown = () => {
        setIsSelected(false)
        setQuery('')
        setIsOpen(!isOpen)
    }

    const handleSelectItem = (item) => {
        setIsSelected(true)
        onItemSelected(item.id)
        setSelected(item.name)
        setIsOpen(false)
    }

    const removeItem = () => {
        setIsSelected(false)
        setSelected('')
        onItemSelected(null)
    }

    const filterItems = (value) => {
        setIsSelected(false)
        setQuery(value)
    }

    useEffect(() => {
        if (isOpen === true) {
            const checkIfClickedOutside = (e) => {
                if (isOpen && ref.current && !ref.current.contains(e.target)) {
                    setIsOpen(false)
                    if(selected !== null) {
                        setIsSelected(true)
                    }
                }
            }
            document.addEventListener('mousedown', checkIfClickedOutside)
            return () => {
                document.removeEventListener('mousedown', checkIfClickedOutside)
            }
        }
    }, [isOpen])

    const fetch = (q = '') => {
        setLoading(true)
        axios.get(route('api.role.index', { 'q': q, 'all': all }), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.user.jwt_token
            }
        })
        .then((response) => {
            setShowItem(response.data)
        })
        .catch((err) => {
            alert(err)
        })
        .finally(() => setLoading(false))
    }

    // every select item open
    useEffect(() => {
        if (isOpen) {
            fetch(q)
        }
    }, [q, isOpen])

    // once page load
    useEffect(() => {
        fetch()
    }, [])

    useEffect(() => {
        if(disabled) {
            setSelected('')
        }
    }, [disabled])

    useEffect(() => {
        if (itemSelected !== null) {
            const item = showItems.find(item => item.id === itemSelected)
            if(item) {
                setSelected(item.name)
                setIsSelected(true)
            }
            return 
        }
        setIsSelected(false)
    }, [itemSelected, loading])

    useEffect(() => {
        if(isSelected && selected === '') {
            setSelected('')
            setIsSelected(false)
        }
    }, [isSelected])

    return (
        <div className="flex flex-col items-center" ref={ref}>
            
            <div className="w-full flex flex-col items-center">
                <div className="w-full">
                    <div className="flex flex-col relative">
                        {label !== '' && (
                            <label htmlFor="first_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                        )}
                        <div className="w-full">
                            <div
                                className={`p-1.5 bg-gray-50 dark:bg-gray-700 flex border rounded-lg
                                ${
                                    error
                                        ? 'border-red-500'
                                        : 'border-gray-300 dark:border-gray-600'
                                }
                                ${disabled ? 'bg-gray-50' : ''}`}
                            >
                                <input
                                    className="block w-full text-sm bg-gray-50 text-gray-900 dark:border-gray-700 border cursor-pointer dark:text-gray-300 outline-none border-transparent dark:bg-gray-700 dark:placeholder-gray-400 px-1"
                                    onMouseDown={onInputMouseDown}
                                    placeholder={placeholder}
                                    value={`${isSelected ? (selected === null ? '' : selected) : query}`}
                                    onChange={(e) =>
                                        filterItems(e.target.value)
                                    }
                                    disabled={disabled}
                                />
                                {isSelected && (
                                    <div onClick={disabled ? () => {} : removeItem}>
                                        <button className="cursor-pointer w-6 h-6 text-red-300 outline-none focus:outline-none">
                                            <HiX/>
                                        </button>
                                    </div>
                                )}
                                <div onClick={disabled ? () => {} : toggle}>
                                    <button className="cursor-pointer w-6 h-6 text-gray-300 outline-none focus:outline-none">
                                        {isOpen ? (
                                            <HiChevronUp/>
                                        ) : (
                                            <HiChevronDown/>
                                        )}
                                    </button>
                                </div>
                            </div>
                            {error && (
                                <p className="mb-2 text-sm text-red-600 dark:text-red-500">{error}</p>
                            )}
                        </div>
                        {isOpen && (
                            <div
                                className="absolute mt-1 shadow-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-200 top-100 z-40 w-full lef-0 rounded overflow-y-auto"
                                style={{ maxHeight: '300px', top: '100%' }}
                            >
                                <div className="flex flex-col w-full">
                                    {loading ? (
                                        <div>
                                            <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-neutral-content">
                                                <div className="w-full items-center justify-center flex">
                                                    <div className="mx-2 my-5">
                                                        <Spinner className='mr-2'/>
                                                        <span>Loading...</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {showItems.map((item, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() =>
                                                        handleSelectItem(item)
                                                    }
                                                >
                                                    <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-neutral-content hover:bg-gray-400 bg-opacity-10 dark:hover:bg-gray-200 dark:hover:bg-opacity-10 dark:hover:text-gray-100">
                                                        <div className="w-full items-center flex">
                                                            <div className="mx-2">
                                                                <span>
                                                                    {item.name}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {showItems.length <= 0 && (
                                                <div>
                                                    <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-neutral-content">
                                                        <div className="w-full items-center justify-center flex">
                                                            <div className="mx-2 my-5">
                                                                <span>
                                                                    No Items Found
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}