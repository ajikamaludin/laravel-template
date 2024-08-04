import { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/react'
import { isEmpty } from 'lodash'
import { HiXMark } from 'react-icons/hi2'

import Modal from './Modal'
import PaginationApi from './PaginationApi'
import Spinner from './Spinner'
import SearchInput from './SearchInput'
import { useDebounce, useSelectApiPagination } from '@/hooks'

/**
 *
 * @param {*} props
 * @returns
 *
 * Example :
 * <SelectModalInput
 *     label="Role"
 *     value={data.role}
 *     onChange={(item) =>
 *         setData({
 *             ...data,
 *             role_id: item ? item.id : null,
 *         })
 *     }
 *     onRemove={() => setData({...data, role_id: null })}
 *     error={errors.role_id}
 *     params={{
 *         table: 'roles',
 *         columns: 'id|name',
 *         orderby: 'created_at.asc',
 *     }}
 * />
 */
export default function SelectModalInput(props) {
    const {
        props: { auth },
    } = usePage()

    const {
        label,
        error,
        value,
        onChange,
        onRemove,
        params,
        placeholder = '',
        size,
    } = props

    const [headers] = useState(
        params.columns.split('|').filter((i) => i !== 'id')
    )

    const [selected, setSelected] = useState('')

    const [search, setSearch] = useState('')
    const q = useDebounce(search, 750)

    const [isOpen, setOpen] = useState()

    const toggle = () => {
        setOpen(!isOpen)
    }

    const [data, fetch, loading] = useSelectApiPagination(auth, {
        table: params.table,
        display_name: params.columns,
        orderby: params.orderby,
        limit: params.limit,
        q: q,
        pagination: 'true',
    })

    const showRemoveBtn = typeof onRemove === 'function' && !isEmpty(selected)

    const handleItemSelected = (item) => {
        onChange(item)
        toggle()
    }

    // in state isOpen change
    useEffect(() => {
        if (isOpen === true) {
            fetch(1)
        }
    }, [isOpen])

    // in searching
    useEffect(() => {
        fetch(1, { q })
    }, [q])

    useEffect(() => {
        if (isEmpty(value) === false) {
            let display_name = headers
            if (isEmpty(params.display_name) === false) {
                display_name = params.display_name.split('|')
            }

            setSelected(
                display_name
                    .map((h) => {
                        return value[h]
                    })
                    .join(' | ')
            )
        } else {
            setSelected('')
        }
    }, [value])

    return (
        <>
            <div className="form-control">
                <div className="label">
                    <label className="label-text">{label}</label>
                </div>
                <div className="flex flex-row">
                    <input
                        className={`input input-bordered w-full ${
                            error && 'input-error'
                        } ${showRemoveBtn && 'border-r-0 rounded-r-none'}`}
                        value={selected}
                        onClick={toggle}
                        placeholder={placeholder}
                        readOnly={true}
                    />
                    {showRemoveBtn && (
                        <div
                            className={`flex items-center justify-center border border-l-0 rounded-r-lg w-10 ${
                                error ? 'border-red-400' : 'border-gray-700'
                            }`}
                            onClick={onRemove}
                        >
                            <HiXMark className="h-4 w-4" />
                        </div>
                    )}
                </div>
                <p className="label-text text-red-600">{error}</p>
            </div>
            <Modal isOpen={isOpen} onClose={toggle} size={size}>
                <div className="mb-3"></div>
                <SearchInput
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {loading ? (
                    <div className="w-full flex justify-center items-center gap-4 mt-3 h-36">
                        <Spinner />
                        <div>Loading </div>
                    </div>
                ) : (
                    <>
                        <table className="table mt-3">
                            <thead>
                                <tr>
                                    {headers.map((h) => (
                                        <th
                                            className="capitalize"
                                            key={`header-${h}`}
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.data?.map((item) => (
                                    <tr
                                        onClick={() => handleItemSelected(item)}
                                        key={item.id}
                                        className="hover"
                                    >
                                        {headers.map((h) => (
                                            <td key={`${item.id}-${h}`}>
                                                {item[h]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="w-full flex justify-center mt-2">
                            <PaginationApi
                                links={data}
                                page={data.current_page}
                                onPageChange={fetch}
                            />
                        </div>
                    </>
                )}
            </Modal>
        </>
    )
}
