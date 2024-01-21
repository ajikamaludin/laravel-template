import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            page={'Dashboard'}
            action={''}
        >
            <Head title="Dashboard" />

            <div>
                <div className="mx-auto sm:px-6 lg:px-8 ">
                    <div className="overflow-hidden bg-white border shadow-sm sm:rounded-lg dark:bg-slate-800 dark:border-gray-700">
                        <div className="p-6 dark:text-gray-100 ">Dashboard</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
