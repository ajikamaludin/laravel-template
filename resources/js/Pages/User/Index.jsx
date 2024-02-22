import React, { useEffect, useState } from 'react'
import { router, Head } from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { HiPencil, HiTrash } from 'react-icons/hi'
import { useModalState } from '@/hooks'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Pagination from '@/Components/Pagination'
import ModalConfirm from '@/Components/Preline/ModalConfirm'
import SearchInput from '@/Components/Preline/SearchInput'
import Button from '@/Components/Preline/Button'
import Dropdown from '@/Components/Preline/Dropdown'
import HasPermission from '@/Components/Common/HasPermission'
import Card from '@/Components/Preline/Card'
import Table from '@/Components/Preline/Table'
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

            <div>
                <div className="mx-auto sm:px-6 lg:px-8">
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
                                    Name
                                </Table.HeaderItem>
                                <Table.HeaderItem className="col-span-2">
                                    Role
                                </Table.HeaderItem>
                                <Table.HeaderItem className="col-span-1"/>
                            </Table.Header>
                            {data.map((user) => (
                                <Table.Body className="grid-cols-5" key={user.id}>
                                    <Table.BodyItem className="col-span-2 py-4 px-6 text-start">
                                            {user.name}
                                    </Table.BodyItem>
                                    <Table.BodyItem className="col-span-2 py-4 px-6 text-start">
                                        {user.role === null
                                            ? 'System'
                                            : user.role?.name}
                                    </Table.BodyItem>
                                    <Table.BodyItem className="col-span-1 py-4 px-6 text-end">
                                        <Dropdown
                                            label={'Opsi'}
                                            arrowIcon={true}
                                            dismissOnClick={true}
                                            size={'sm'}
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
                        </Table>
                        <div className="w-full overflow-x-auto flex lg:justify-center">
                            <Pagination links={links} params={params} />
                        </div>
                    </Card>
                </div>
            </div>
            <ModalConfirm modalState={confirmModal} onConfirm={onDelete} />
            <FormModal modalState={formModal} />
        </AuthenticatedLayout>
    )
}
