import React, { useEffect, useState } from 'react'
import { router } from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { Head, Link } from '@inertiajs/react'
import { HiPencil, HiTrash } from 'react-icons/hi'
import { useModalState } from '@/hooks'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Pagination from '@/Components/Pagination'
import ModalConfirm from '@/Components/Preline/ModalConfirm'
import SearchInput from '@/Components/Preline/SearchInput'
import HasPermission from '@/Components/Common/HasPermission'
import Dropdown from '@/Components/Preline/Dropdown'
import Button from '@/Components/Preline/Button'
import Card from '@/Components/Preline/Card'
import Table from '@/Components/Preline/Table'

export default function Index(props) {
    const {
        data: { links, data },
    } = props

    const [search, setSearch] = useState('')
    const preValue = usePrevious(search)

    const confirmModal = useModalState()

    const handleDeleteClick = (product) => {
        confirmModal.setData(product)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('roles.destroy', confirmModal.data.id))
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
        <AuthenticatedLayout
            page={'System'}
            action={'Role'}
        >
            <Head title="Role" />

            <div>
                <div className="mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <div className="flex justify-between">
                            <HasPermission p="create-role">
                                <Link href={route('roles.create')}>
                                    <Button size="sm">Tambah</Button>
                                </Link>
                            </HasPermission>

                            <div className="flex items-center">
                                <SearchInput
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                />
                            </div>
                        </div>
                        <Table>
                            <Table.Header>
                                <Table.HeaderItem
                                    className="col-span-3"
                                >
                                    Name
                                </Table.HeaderItem>
                                <Table.HeaderItem
                                    className="col-span-1"
                                />
                            </Table.Header>
                            {data.map((role, index) => (
                                <Table.Body key={role.id}>
                                    <Table.BodyItem className="col-span-3 py-4 px-6 text-start">
                                        {role.name}
                                    </Table.BodyItem>
                                    <Table.BodyItem className="col-span-1 relative py-4 px-6 flex justify-end">
                                        <Dropdown label={'Opsi'} last={index + 1 === +data.length}>
                                            <HasPermission p="update-role">
                                                <Dropdown.Item
                                                    onClick={() =>
                                                        router.visit(
                                                            route(
                                                                'roles.edit',
                                                                role
                                                            )
                                                        )
                                                    }
                                                >
                                                    <div className="flex space-x-1 items-center">
                                                        <HiPencil />
                                                        <div>
                                                            Ubah
                                                        </div>
                                                    </div>
                                                </Dropdown.Item>
                                            </HasPermission>
                                            <HasPermission p="delete-role">
                                                <Dropdown.Item
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            role
                                                        )
                                                    }
                                                >
                                                    <div className="flex space-x-1 items-center">
                                                        <HiTrash />
                                                        <div>
                                                            Hapus
                                                        </div>
                                                    </div>
                                                </Dropdown.Item>
                                            </HasPermission>
                                        </Dropdown>
                                    </Table.BodyItem>
                                </Table.Body>
                            ))}
                        </Table>
                        <div className="w-full overflow-x-auto flex lg:justify-center">
                            <Pagination links={links} params={params} />
                        </div>
                    </Card>
                </div>
            </div>
            <ModalConfirm modalState={confirmModal} onConfirm={onDelete} />
        </AuthenticatedLayout>
    )
}
