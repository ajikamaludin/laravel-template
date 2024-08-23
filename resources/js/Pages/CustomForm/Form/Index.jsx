import React, { useEffect, useState } from 'react'
import { router, Head, Link } from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { HiPencil, HiTrash } from 'react-icons/hi2'
import { HiEye } from 'react-icons/hi2'
import { useModalState } from '@/hooks'

import HasPermission from '@/Components/Common/HasPermission'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Pagination from '@/Components/DaisyUI/Pagination'
import ModalConfirm from '@/Components/DaisyUI/ModalConfirm'
import SearchInput from '@/Components/DaisyUI/SearchInput'
import Button from '@/Components/DaisyUI/Button'
import Dropdown from '@/Components/DaisyUI/Dropdown'
import Card from '@/Components/DaisyUI/Card'

export default function Index(props) {
    const {
        data: { links, data },
    } = props

    const [search, setSearch] = useState('')
    const preValue = usePrevious(search)

    const confirmModal = useModalState()

    const handleDeleteClick = (item) => {
        confirmModal.setData(item)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(
                route('custom-form.forms.destroy', confirmModal.data.id)
            )
        }
    }

    const params = { q: search }
    useEffect(() => {
        if (preValue) {
            router.get(
                route(route().current()),
                { q: search },
                {
                    replace: true,
                    preserveState: true,
                }
            )
        }
    }, [search])

    return (
        <AuthenticatedLayout page={'Module'} action={'Custom Form'}>
            <Head title="Custom Form" />

            <div>
                <Card>
                    <div className="flex justify-between mb-4">
                        <HasPermission p="create-custom-form">
                            <Link href={route('custom-form.forms.create')}>
                                <Button size="sm" type="primary">
                                    Tambah
                                </Button>
                            </Link>
                        </HasPermission>
                        <div className="flex items-center">
                            <SearchInput
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table my-4">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td className="text-end">
                                            <Dropdown>
                                                <Dropdown.Item>
                                                    <Link
                                                        href={route(
                                                            'custom-form.form-records.index',
                                                            item
                                                        )}
                                                        className="flex space-x-1 items-center"
                                                    >
                                                        <HiEye />
                                                        <div>Records</div>
                                                    </Link>
                                                </Dropdown.Item>
                                                <HasPermission p="update-custom-form">
                                                    <Dropdown.Item>
                                                        <Link
                                                            href={route(
                                                                'custom-form.forms.edit',
                                                                item
                                                            )}
                                                            className="flex space-x-1 items-center"
                                                        >
                                                            <HiPencil />
                                                            <div>Ubah</div>
                                                        </Link>
                                                    </Dropdown.Item>
                                                </HasPermission>
                                                <HasPermission p="delete-custom-form">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <HiTrash />
                                                            <div>Hapus</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                </HasPermission>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full overflow-x-auto flex lg:justify-center">
                        <Pagination links={links} params={params} />
                    </div>
                </Card>
            </div>
            <ModalConfirm onConfirm={onDelete} modalState={confirmModal} />
        </AuthenticatedLayout>
    )
}
