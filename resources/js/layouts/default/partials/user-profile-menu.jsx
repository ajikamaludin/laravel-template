import { Link, usePage } from '@inertiajs/react'
import { LogOut, User } from 'lucide-react'

export default function UserProfileMenu() {
    const {
        props: { auth },
    } = usePage()

    return (
        <details className="dropdown dropdown-end p-1 hover:bg-base-200 rounded-md">
            <summary className="btn btn-ghost px-0 my-0">
                <div className="flex flex-row gap-2">
                    <div className="avatar avatar-placeholder">
                        <div className="bg-neutral text-neutral-content w-9 h-9 rounded-full">
                            <span className="text-md font-bold">
                                {auth.user.name
                                    .split(' ')
                                    .slice(0, 2)
                                    .map((n) => n[0])
                                    .join('')
                                    .toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col text-left">
                        <div className="text-sm">{auth.user.name}</div>
                        <div className="text-sm font-light">Profile</div>
                    </div>
                </div>
            </summary>

            <ul className="mt-2 menu dropdown-content z-1 bg-base-300 rounded-box w-52">
                <li>
                    <Link
                        href={route('profile.edit')}
                        as="button"
                    >
                        <User className="w-4 h-4" />
                        My Profile
                    </Link>
                </li>
                <li>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-red-400"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </Link>
                </li>
            </ul>
        </details>
    )
}
