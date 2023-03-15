import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            flash={props.flash}
            page={'Dashboard'}
            action={''}
        >
            <Head title="Dashboard" />

            <div>
                <div className="mx-auto sm:px-6 lg:px-8 ">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg bg-white dark:bg-gray-800">
                        <div className="p-6 dark:text-gray-100 ">Dashboard</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
