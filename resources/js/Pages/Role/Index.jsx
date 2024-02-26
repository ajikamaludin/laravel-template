import React, { useEffect, useState } from 'react'
import { router } from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { Head, Link } from '@inertiajs/react'
import { HiPencil, HiTrash } from 'react-icons/hi'
import { useModalState } from '@/hooks'

import AuthenticatedLayout from '@/Layouts/TailAdmin/AuthenticatedLayout'
import Pagination from '@/Components/Pagination'
import ModalConfirm from '@/Components/TailAdmin/ModalConfirm'
import SearchInput from '@/Components/TailAdmin/SearchInput'
import HasPermission from '@/Components/Common/HasPermission'
import Dropdown from '@/Components/TailAdmin/Dropdown'
import Button from '@/Components/TailAdmin/Button'
import Card from '@/Components/TailAdmin/Card'
import Table from '@/Components/TailAdmin/Table'

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
                            <h5 className="font-medium text-white">Name</h5>
                        </Table.HeaderItem>
                        <Table.HeaderItem
                            className="col-span-1"
                        />
                    </Table.Header>
                    <div className='rounded-b-[10px] bg-white dark:bg-boxdark'>
                        {data.map((role, index) => (
                            <Table.Body key={role.id}>
                                <Table.BodyItem className="col-span-3 text-start">
                                    {role.name}
                                </Table.BodyItem>
                                <Table.BodyItem className="col-span-1 text-end">
                                    <Dropdown 
                                        label={'Opsi'} 
                                        data={data}
                                        index={index}
                                    >
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
                    </div>
                </Table>
                <div className="w-full overflow-x-auto flex lg:justify-center">
                    <Pagination links={links} params={params} />
                </div>
            </Card>
            <ModalConfirm modalState={confirmModal} onConfirm={onDelete} />
        </AuthenticatedLayout>
    )
}
