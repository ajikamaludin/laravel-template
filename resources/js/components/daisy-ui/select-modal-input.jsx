import { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/react'
import { isEmpty } from 'lodash'
import { HiXMark } from 'react-icons/hi2'

import Modal from './modal'
import PaginationApi from './pagination-api'
import Spinner from './spinner'
import SearchInput from './search-input'
import { useDebounce, useSelectApiPagination } from '@/hooks'
import Label from './label'
import TextInputError from './text-input-error'

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
 *         orderby: 'updated_at.desc',
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
        readOnly = false,
        title,
        additionalButton = null,
    } = props

    const [headers] = useState(
        params.columns.split('|').filter((i) => i !== 'id')
    )

    const [table_headers, setTableHeaders] = useState([])
    const [table_header_alias, setTableHeaderAlias] = useState([])

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
        raw_query: params.raw_query,
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

    useEffect(() => {
        if (isEmpty(params.headers) === true) {
            setTableHeaders(params.columns.split('|').filter((i) => i !== 'id'))
            setTableHeaderAlias(
                params.columns.split('|').filter((i) => i !== 'id')
            )
            return
        }
        setTableHeaders(
            params.headers.split('|').map((_, index) => {
                return params.columns.split('|')[index]
            })
        )
        setTableHeaderAlias(
            params.headers.split('|').map((i) => {
                if (i.includes('.')) {
                    return i.split('.')[1]
                }
                return i
            })
        )
    }, [params])

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
                    .filter((h) => isEmpty(value[h]) === false)
                    .map((h) => {
                        return value[h]
                    })
                    .join(' | ')
            )
        } else {
            setSelected('')
        }
    }, [value])

    const showRemoveBtnAndReadOnly = readOnly === false && showRemoveBtn
    return (
        <>
            <fieldset className="fieldset">
                <Label label={label} />
                <div className="flex flex-row">
                    <input
                        className={`input input-bordered w-full ${
                            error && 'input-error'
                        } ${
                            showRemoveBtnAndReadOnly &&
                            'border-r-0 rounded-r-none'
                        }`}
                        value={selected}
                        onClick={readOnly ? null : toggle}
                        placeholder={placeholder}
                        readOnly={true}
                    />
                    {showRemoveBtnAndReadOnly && (
                        <div
                            className={`flex items-center justify-center border border-l-0 rounded-r-lg w-10 bg-base-300 ${
                                error ? 'border-error' : 'border-base-100'
                            }`}
                            onClick={onRemove}
                        >
                            <HiXMark className="h-4 w-4" />
                        </div>
                    )}
                    {additionalButton && (
                        <div className="flex items-center justify-center ml-0">
                            {additionalButton}
                        </div>
                    )}
                </div>
                <TextInputError error={error} />
            </fieldset>
            <Modal isOpen={isOpen} onClose={toggle} size={size} title={title}>
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
                                    {table_header_alias.map((h) => (
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
                                        className="hover:bg-base-300"
                                    >
                                        {table_headers.map((h) => (
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
