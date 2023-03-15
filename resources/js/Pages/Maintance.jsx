import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { HiFire } from 'react-icons/hi';

export default function Maintance(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            flash={props.flash}
            page={"Page"}
            action={"Development Mode"}
        >
            <Head title="Masih Dalam Pengembangan" />

            <div>
                <div className="mx-auto sm:px-6 lg:px-8 text-center">
                    <div className="overflow-hidden py-40 shadow-sm sm:rounded-lg bg-white dark:bg-gray-800 flex justify-center items-center flex-col">
                        <HiFire className='text-center dark:text-white w-40 h-40'/>
                        <div className="p-6 dark:text-gray-100 text-3xl">Fitur Dalam Pengembangan</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}