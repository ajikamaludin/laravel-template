import React, { useEffect, useState } from 'react'
import { router, Head } from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { HiClipboardCopy, HiEye, HiPencil, HiTrash } from 'react-icons/hi'
import { useModalState } from '@/hooks'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Pagination from '@/Components/DaisyUI/Pagination'
import ModalConfirm from '@/Components/DaisyUI/ModalConfirm'
import SearchInput from '@/Components/DaisyUI/SearchInput'
import Button from '@/Components/DaisyUI/Button'
import Card from '@/Components/DaisyUI/Card'
import FormModal from './FormModal'
import { formatDateTime, showToast } from '@/utils'

export default function Index(props) {
    const {
        data: { links, data },
    } = props

    const [search, setSearch] = useState('')
    const preValue = usePrevious(search)

    const confirmModal = useModalState()
    const formModal = useModalState()

    const toggleFormModal = (link = null) => {
        formModal.setData(link)
        formModal.toggle()
    }

    const handleDeleteClick = (link) => {
        confirmModal.setData(link)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('shortlink.link.destroy', confirmModal.data.id))
        }
    }

    const handleCopyToClipboard = (link) => {
        showToast('copied to clipboard', 'success')
        navigator.clipboard.writeText(route('shortlink.redirect', link))
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
        <AuthenticatedLayout page={'Module'} action={'Shortlink'}>
            <Head title="Shortlink" />

            <div>
                <Card>
                    <div className="flex flex-row justify-between mb-4">
                        <div className="flex flex-row gap-1">
                            <Button
                                size="sm"
                                onClick={() => toggleFormModal()}
                                type="primary"
                            >
                                Tambah
                            </Button>
                            <a
                                className="btn btn-secondary"
                                href={route('shortlink.home')}
                                target="_blank"
                            >
                                Front Page
                            </a>
                        </div>
                        <div className="flex items-center">
                            <SearchInput
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table mb-4">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Link</th>
                                    <th>Owner</th>
                                    <th>Visited</th>
                                    <th>Last Visited At</th>
                                    <th className="min-w-[150px]" />
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((link, index) => (
                                    <tr key={link.id}>
                                        <td>{link.name}</td>
                                        <td>
                                            <div
                                                className="flex flex-row gap-1"
                                                onClick={() =>
                                                    handleCopyToClipboard(link)
                                                }
                                            >
                                                {route(
                                                    'shortlink.redirect',
                                                    link
                                                )}
                                                <HiClipboardCopy className="h-5 w-5" />
                                            </div>
                                        </td>
                                        <td>
                                            {link.user ? link.user.name : ''}
                                        </td>
                                        <td>{link.visit_count}</td>
                                        <td>
                                            {formatDateTime(
                                                link.last_visited_at
                                            )}
                                        </td>
                                        <td className="text-end">
                                            <div className="flex flex-row gap-1">
                                                <Button
                                                    onClick={() =>
                                                        router.visit(
                                                            route(
                                                                'shortlink.link.show',
                                                                link
                                                            )
                                                        )
                                                    }
                                                >
                                                    <div className="flex space-x-1 items-center">
                                                        <HiEye />
                                                    </div>
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        toggleFormModal(link)
                                                    }
                                                >
                                                    <div className="flex space-x-1 items-center">
                                                        <HiPencil />
                                                    </div>
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        handleDeleteClick(link)
                                                    }
                                                >
                                                    <div className="flex space-x-1 items-center">
                                                        <HiTrash />
                                                    </div>
                                                </Button>
                                            </div>
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
            <FormModal modalState={formModal} />
        </AuthenticatedLayout>
    )
}
