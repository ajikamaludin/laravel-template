import Chart from 'react-apexcharts'
import { Card } from '@/components/index'

export default function DummyDashbord() {
    return (
        <div className="w-full flex flex-col gap-2">
            <Card>
                <div className="font-bold text-2xl">Daily Sales Analytics</div>
                <Chart
                    options={{
                        chart: {
                            id: 'sale-bar',
                            toolbar: {
                                show: false,
                            },
                        },
                        grid: {
                            show: false,
                        },
                        xaxis: {
                            categories: Array.from({ length: 30 }).map(
                                (_, i) => i + 1
                            ),
                            lines: {
                                show: false,
                            },
                        },
                        yaxis: {
                            lines: {
                                show: false,
                            },
                        },
                    }}
                    series={[
                        {
                            name: 'sales',
                            data: Array.from({ length: 30 }).map((_, i) =>
                                parseInt(Math.random() * i)
                            ),
                        },
                    ]}
                    type="bar"
                    width="100%"
                    height="200px"
                />
            </Card>
            <div className="w-full flex flex-col md:flex-row gap-2 h-[350px]">
                <div className="w-full md:w-2/5">
                    <Card>
                        <div className="font-bold text-2xl">Top Sales</div>
                        <Chart
                            options={{
                                chart: {
                                    width: 380,
                                    type: 'pie',
                                },
                                labels: [
                                    'Team A',
                                    'Team B',
                                    'Team C',
                                    'Team D',
                                    'Team E',
                                ],
                                colors: [
                                    '#9061F9',
                                    '#1C64F2',
                                    '#16BDCA',
                                    '#FDBA8C',
                                    '#E74694',
                                ],
                                stroke: {
                                    colors: ['transparent'],
                                    lineCap: '',
                                },
                            }}
                            series={[20, 30, 10, 5, 5]}
                            type="pie"
                            width="380px"
                            height="380px"
                        />
                    </Card>
                </div>
                <div className="w-full md:w-3/5">
                    <Card>
                        <div className="font-bold text-2xl">
                            Sales Performance
                        </div>
                        <Chart
                            options={{
                                chart: {
                                    type: 'area',
                                },
                                dataLabels: {
                                    enabled: false,
                                },
                                stroke: {
                                    curve: 'smooth',
                                },
                                grid: {
                                    show: false,
                                },
                                xaxis: {
                                    type: 'datetime',
                                    categories: [
                                        '2024-09-19T00:00:00.000Z',
                                        '2024-09-19T01:30:00.000Z',
                                        '2024-09-19T02:30:00.000Z',
                                        '2024-09-19T03:30:00.000Z',
                                        '2024-09-19T04:30:00.000Z',
                                        '2024-09-19T05:30:00.000Z',
                                        '2024-09-19T06:30:00.000Z',
                                    ],
                                },
                                tooltip: {
                                    x: {
                                        format: 'dd/MM/yy HH:mm',
                                    },
                                },
                            }}
                            series={[
                                {
                                    name: 'Team A',
                                    data: [31, 40, 28, 51, 42, 109, 100],
                                },
                                {
                                    name: 'Team B',
                                    data: [11, 32, 45, 32, 34, 52, 41],
                                },
                            ]}
                            type="area"
                            width="100%"
                            height="235px"
                        />
                    </Card>
                </div>
            </div>
        </div>
    )
}
