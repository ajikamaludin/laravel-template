import React from 'react';
import { Head } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/TailAdmin/AuthenticatedLayout';
import Card from '@/Components/TailAdmin/Card';
import CardDataStats from '@/Components/TailAdmin/CardDataStats';
import UserIcon from '@/Components/TailAdmin/Icons/User';

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            page={'Dashboard'}
            action={''}
        >
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 gap-4 md:gap-6 2xl:gap-7.5 mb-4">
                <Card>Dashboard</Card>
            </div>
                    
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <CardDataStats title="Roles" total={props.role_count}><UserIcon/></CardDataStats>
                <CardDataStats title="User" total={props.user_count}><UserIcon/></CardDataStats>
                <CardDataStats title="Empty" total={0}><UserIcon/></CardDataStats>
                <CardDataStats title="Empty" total={0}><UserIcon/></CardDataStats>
            </div>
        </AuthenticatedLayout>
    );
}
