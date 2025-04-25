import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { Head, router } from '@inertiajs/react'
import { isEmpty } from 'lodash'
import { usePrevious } from 'react-use'
import { ClipboardCopy, Eye } from 'lucide-react'

import { useModal } from '@/hooks'
import { formatDateTime, showToast } from '@/utils'
import AuthenticatedLayout from '@/layouts/default/authenticated-layout'
import {
    Pagination,
    Card,
    Button,
    FormInputDateRange,
} from '@/components/index'
import JsonModal from './json-modal'

export default function Index(props) {
    const {
        link,
        data: { links, data },
        charts,
        _startDate,
        _endDate,
    } = props

    const options = {
        chart: {
            id: 'visitor-bar',
        },
        grid: {
            show: false,
        },
        xaxis: {
            categories: charts.map((i) => i.date),
            lines: {
                show: false,
            },
        },
        yaxis: {
            lines: {
                show: false,
            },
        },
    }
    const series = [
        {
            name: 'visitor',
            data: charts.map((i) => i.visitor),
        },
    ]

    const [dates, setDates] = useState({
        start_date: _startDate,
        end_date: _endDate,
    })
    const preValue = usePrevious(dates)

    const jsonModal = useModal()

    const showModal = (value) => {
        jsonModal.setData(value)
        jsonModal.toggle()
    }

    const handleCopyToClipboard = () => {
        showToast('copied to clipboard', 'success')
        navigator.clipboard.writeText(route('shortlink.redirect', link))
    }

    const params = { ...dates }

    useEffect(() => {
        if (isEmpty(dates.endDate)) {
            return
        }
        if (preValue) {
            router.get(route(route().current(), link), dates, {
                replace: true,
                preserveState: true,
            })
        }
    }, [dates])

    return (
        <AuthenticatedLayout
            title={'Link Detail'}
            breadcumbs={[
                { name: 'Shortlink', href: route('shortlink.link.index') },
                { name: 'Show', href: route('shortlink.link.show', link) },
            ]}
        >
            <Head title="Shortlink" />

            <div className="w-full flex flex-col gap-4">
                <div>
                    <div className="grid md:grid-cols-3 gap-2">
                        <div className="stats bg-base-100 shadow flex-1">
                            <div className="stat">
                                <div className="stat-title">Total Visitor</div>
                                <div className="stat-value text-primary">
                                    {link.visit_count}
                                </div>
                                <div className="stat-desc">
                                    {link.last_visited_at}{' '}
                                </div>
                            </div>
                        </div>
                        <div className="stats bg-base-100 shadow">
                            <div className="stat">
                                <div className="stat-title text-xl">
                                    {link.name}
                                </div>
                                <div className="stat-desc">
                                    <div
                                        className="flex flex-row items-center gap-2"
                                        onClick={handleCopyToClipboard}
                                    >
                                        <div>
                                            {route('shortlink.redirect', link)}
                                        </div>
                                        <ClipboardCopy className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="stats bg-base-100 shadow">
                            <div className="stat text-xs hover:underline hover:text-blue-700">
                                <a
                                    href={link.real_link}
                                    target="_blank"
                                >
                                    {link.real_link}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <Card>
                    <div className="w-full h-[270px]">
                        <div className="p-1">
                            <FormInputDateRange
                                value={dates}
                                onChange={setDates}
                            />
                        </div>
                        <Chart
                            options={options}
                            series={series}
                            type="bar"
                            width="100%"
                            height="200px"
                        />
                    </div>
                </Card>
                <Card>
                    <div className="overflow-x-auto">
                        <table className="table mb-4">
                            <thead>
                                <tr>
                                    <th>Device</th>
                                    <th>Platform</th>
                                    <th>Browser</th>
                                    <th>IP</th>
                                    <th>Visit At</th>
                                    <th>Request</th>
                                    <th>Header</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((visitor, index) => (
                                    <tr key={visitor.id}>
                                        <td>{visitor.device}</td>
                                        <td>{visitor.platform}</td>
                                        <td>{visitor.browser}</td>
                                        <td>{visitor.ip}</td>
                                        <td>
                                            {formatDateTime(visitor.created_at)}
                                        </td>
                                        <td>
                                            <Button
                                                onClick={() =>
                                                    showModal(visitor.request)
                                                }
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                onClick={() =>
                                                    showModal(visitor.header)
                                                }
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full overflow-x-auto flex lg:justify-center">
                        <Pagination
                            links={links}
                            params={params}
                        />
                    </div>
                </Card>
            </div>
            <JsonModal modalState={jsonModal} />
        </AuthenticatedLayout>
    )
}
