import React, { useEffect, useState } from 'react'
import { router, Head } from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { HiPencil, HiTrash } from 'react-icons/hi'
import { useModalState } from '@/hooks'

import AuthenticatedLayout from '@/Layouts/TailAdmin/AuthenticatedLayout'
import Pagination from '@/Components/Pagination'
import ModalConfirm from '@/Components/TailAdmin/ModalConfirm'
import SearchInput from '@/Components/TailAdmin/SearchInput'
import Button from '@/Components/TailAdmin/Button'
import Dropdown from '@/Components/TailAdmin/Dropdown'
import HasPermission from '@/Components/Common/HasPermission'
import Card from '@/Components/TailAdmin/Card'
import Table from '@/Components/TailAdmin/Table'
import FormModal from './FormModal'

export default function Index(props) {
    const { data: { links, data } } = props

    const [search, setSearch] = useState('')
    const preValue = usePrevious(search)

    const confirmModal = useModalState()
    const formModal = useModalState()

    const toggleFormModal = (user = null) => {
        formModal.setData(user)
        formModal.toggle()
    }

    const handleDeleteClick = (user) => {
        confirmModal.setData(user)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('user.destroy', confirmModal.data.id))
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
            action={'User'}
        >
            <Head title="User" />

            <Card>
                <div className="flex justify-between">
                    <HasPermission p="create-user">
                        <Button
                            size="sm"
                            onClick={() => toggleFormModal()}
                        >
                            Tambah
                        </Button>
                    </HasPermission>
                    <div className="flex items-center">
                        <SearchInput
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                    </div>
                </div>
                <Table>
                    <Table.Header className="grid-cols-5">
                        <Table.HeaderItem className="col-span-2">
                            <h5 className="font-medium text-white">Name</h5>
                        </Table.HeaderItem>
                        <Table.HeaderItem className="col-span-2">
                            <h5 className="font-medium text-white">Role</h5>
                        </Table.HeaderItem>
                        <Table.HeaderItem className="col-span-1"/>
                    </Table.Header>
                    <div className='rounded-b-[10px] bg-white dark:bg-boxdark'>
                        {data.map((user, index) => (
                            <Table.Body className="grid-cols-5" key={user.id}>
                                <Table.BodyItem className="col-span-2 text-start">
                                        {user.name}
                                </Table.BodyItem>
                                <Table.BodyItem className="col-span-2 text-start">
                                    {user.role === null
                                        ? 'System'
                                        : user.role?.name}
                                </Table.BodyItem>
                                <Table.BodyItem className="col-span-1 text-end">
                                    <Dropdown
                                        label={'Opsi'}
                                        data={data}
                                        index={index}
                                    >
                                        <HasPermission p="update-user">
                                            <Dropdown.Item
                                                onClick={() =>
                                                    toggleFormModal(
                                                        user
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
                                        <HasPermission p="delete-user">
                                            <Dropdown.Item
                                                onClick={() =>
                                                    handleDeleteClick(
                                                        user
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
            <FormModal modalState={formModal} />
        </AuthenticatedLayout>
    )
}
