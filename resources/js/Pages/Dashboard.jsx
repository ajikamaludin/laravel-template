import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Card from '@/Components/Preline/Card';

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            page={'Dashboard'}
            action={''}
        >
            <Head title="Dashboard" />

            <div>
                <div className="mx-auto sm:px-6 lg:px-8 ">
                    <Card>Dashboard</Card>
                    <div className='w-full grid grid-cols-4 py-2 space-x-2'>
                        <Card>
                            <h3 className="text-lg font-bold">
                                {props.role_count}
                            </h3>
                            <p className="mt-1 text-gray-500 dark:text-gray-400">
                                Roles
                            </p>
                        </Card>
                        <Card>
                            <h3 className="text-lg font-bold">
                                {props.user_count}
                            </h3>
                            <p className="mt-1 text-gray-500 dark:text-gray-400">
                                Users
                            </p>
                        </Card>
                        <Card>
                            <h3 className="text-lg font-bold">
                                0
                            </h3>
                            <p className="mt-1 text-gray-500 dark:text-gray-400">
                                Empty
                            </p>
                        </Card>
                        <Card>
                            <h3 className="text-lg font-bold">
                                0
                            </h3>
                            <p className="mt-1 text-gray-500 dark:text-gray-400">
                                Empty
                            </p>
                        </Card>
                    </div>
                </div>
                
            </div>
        </AuthenticatedLayout>
    );
}
