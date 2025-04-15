import { useRef, useEffect, useState } from 'react'
import { usePage } from '@inertiajs/react'
import { HiChevronDown, HiChevronUp, HiXMark } from 'react-icons/hi2'
import { isEmpty } from 'lodash'
import axios from 'axios'
import qs from 'qs'

import { useDebounce } from '@/hooks'
import Spinner from './spinner'

/**
 * This selection input is old fasion will be replace with SelectModalInput
 * @param {*} props
 * @returns
 *
 * Example usage
 * <SelectionInput
 *     label="Role"
 *     itemSelected={data.role_id}
 *     onItemSelected={(item) =>
 *         setData('role_id', item ? item.id : null)
 *     }
 *     error={errors.role_id}
 *     placeholder="role"
 *     data={{
 *         table: 'roles',
 *         display_name: 'id|name',
 *         orderby: 'created_at.asc',
 *     }}
 * />
 */
export default function SelectionInput(props) {
    const ref = useRef()
    const {
        props: { auth },
    } = usePage()
    const [display_name, setDisplayName] = useState([])
    const [separator, setSeparator] = useState(' - ')
    const [_placeholder, setPlaceholder] = useState('')

    const {
        label = '',
        itemSelected = null,
        onItemSelected = () => {},
        disabled = false,
        placeholder = '',
        error = '',
        limit = 100,
        data = {
            table: '',
            display_name: '',
            orderby: '',
            separator: ' - ',
        },
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
        if (isOpen === true) {
            return
        }
        setIsSelected(false)
        setQuery('')
        setIsOpen(!isOpen)
    }

    const handleSelectItem = (item) => {
        setIsSelected(true)
        setIsOpen(false)
        onItemSelected(item)
    }

    const removeItem = () => {
        setIsSelected(false)
        onItemSelected(false)
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
                    if (selected !== null) {
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
        axios
            .get(
                `
                ${route('api.select.table', data.table)}?${qs.stringify({
                    q,
                    limit,
                    display_name: data.display_name,
                    orderby: data.orderby,
                })}
                `,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: auth.jwt_prefix + auth.jwt_token,
                    },
                }
            )
            .then((response) => {
                setShowItem(response.data)
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    // every select item open
    useEffect(() => {
        setPlaceholder(placeholder)
        if (isOpen) {
            fetch(q)
            setPlaceholder('type to search')
        }
    }, [q, isOpen])

    // once page load
    useEffect(() => {
        // init
        setDisplayName(data.display_name.split('|'))
        setSeparator(data.separator ?? ' - ')
        setPlaceholder(isEmpty(placeholder) ? '' : placeholder)

        fetch()
    }, [])

    useEffect(() => {
        if (disabled) {
            setSelected('')
        }
    }, [disabled])

    useEffect(() => {
        if (itemSelected !== null) {
            const item = showItems.find((item) => item.id === itemSelected)
            if (item) {
                let selected_name = ''
                {
                    display_name.map(
                        (dn, i) =>
                            (selected_name =
                                selected_name +
                                `${i == 0 ? '' : separator}` +
                                item[`${dn}`])
                    )
                }
                setSelected(selected_name)
                setIsSelected(true)
            }
            return
        }
        setIsSelected(false)
    }, [itemSelected, loading])

    useEffect(() => {
        if (isSelected && selected === '') {
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
                            <label className="mb-2 block text-sm font-medium text-base-content">
                                {label}
                            </label>
                        )}
                        <div className="w-full">
                            <div
                                className={`flex items-center input px-0
                                ${
                                    error
                                        ? ' border-red-500'
                                        : ' border-base-content border-opacity-20'
                                }`}
                                style={{ borderWidth: '1px' }}
                            >
                                <input
                                    className={`input w-full border-none ${
                                        disabled ? 'invisible' : ''
                                    }`}
                                    onMouseDown={onInputMouseDown}
                                    placeholder={_placeholder}
                                    value={`${
                                        isSelected
                                            ? selected === null
                                                ? ''
                                                : selected
                                            : query
                                    }`}
                                    onChange={(e) =>
                                        filterItems(e.target.value)
                                    }
                                />
                                {isSelected && (
                                    <div
                                        onClick={
                                            disabled ? () => {} : removeItem
                                        }
                                    >
                                        <button className="cursor-pointer w-6 h-6 text-red-300 outline-hidden focus:outline-hidden">
                                            <HiXMark />
                                        </button>
                                    </div>
                                )}
                                <div onClick={disabled ? () => {} : toggle}>
                                    <button className="cursor-pointer w-6 h-6 text-gray-300 outline-hidden focus:outline-hidden">
                                        {isOpen ? (
                                            <HiChevronUp />
                                        ) : (
                                            <HiChevronDown />
                                        )}
                                    </button>
                                </div>
                            </div>
                            {error && (
                                <p className="my-2 text-sm text-red-600 dark:text-red-500">
                                    {error}
                                </p>
                            )}
                        </div>
                        {isOpen && (
                            <div
                                className="absolute mt-1 shadow-lg top-100 z-40 w-full lef-0 rounded-sm overflow-y-auto bg-base-300 text-base-content"
                                style={{ maxHeight: '100px', top: '100%' }}
                            >
                                <div className="flex flex-col w-full">
                                    {loading ? (
                                        <div>
                                            <div className="flex w-full items-center p-2 pl-2 border-transparent relative">
                                                <div className="w-full items-center justify-center flex mx-2 my-5 gap-2">
                                                    <Spinner />
                                                    <span>Loading...</span>
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
                                                    <div className="flex w-full items-center p-2 pl-2 relative bg-base-100 hover:bg-opacity-10">
                                                        <div className="w-full items-center flex">
                                                            <div className="mx-2">
                                                                {display_name.map(
                                                                    (dn, i) => (
                                                                        <span
                                                                            key={
                                                                                dn
                                                                            }
                                                                            index={
                                                                                i
                                                                            }
                                                                        >
                                                                            {i ==
                                                                            0
                                                                                ? ''
                                                                                : `${separator}`}
                                                                            {
                                                                                item[
                                                                                    `${dn}`
                                                                                ]
                                                                            }
                                                                        </span>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {showItems.length <= 0 && (
                                                <div>
                                                    <div className="flex w-full items-center p-2 relative">
                                                        <div className="w-full items-center justify-center flex mx-2 my-5">
                                                            <span>
                                                                No Items Found
                                                            </span>
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
