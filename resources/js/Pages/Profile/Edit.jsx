import React from 'react'
import { Head } from '@inertiajs/react'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Card } from '@/Components/Index'
import UpdatePasswordForm from './Partials/UpdatePasswordForm'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm'

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout page={'System'} action={'Profile'}>
            <Head title="Profile" />

            <div>
                <div className="mx-auto space-y-6">
                    <Card>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </Card>

                    <Card>
                        <UpdatePasswordForm className="max-w-xl" />
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
