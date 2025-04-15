import { HiMoon, HiSun } from 'react-icons/hi2'

export function ThemeSwitch() {
    const themes = [
        'nord',
        'dim',
        'winter',
        'business',
        'dark',
        'light',
        'cupcake',
        'corporate',
        'lofi',
    ]

    return (
        <div>
            <div className="dropdown dropdown-end">
                <div
                    tabIndex={0}
                    role="button"
                    className="btn m-1"
                >
                    Theme
                    <svg
                        width="12px"
                        height="12px"
                        className="h-2 w-2 fill-current opacity-60 inline-block"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 2048 2048"
                    >
                        <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="dropdown-content z-1 p-2 shadow-2xl bg-base-100 rounded-box w-52"
                >
                    {themes.map((t, i) => (
                        <li key={i}>
                            <input
                                type="radio"
                                name="theme-dropdown"
                                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                                data-set-theme={t}
                                data-act-class="ACTIVECLASS"
                                aria-label={t}
                                value={t}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export function DarkSwitch() {
    return (
        <label className="swap swap-rotate">
            <input
                type="checkbox"
                data-toggle-theme="dark,light" // change here
                data-act-class="ACTIVECLASS"
                className="hidden"
            />
            {/* sun icon */}
            <HiSun className="swap-off h-5 w-5" />

            {/* moon icon */}
            <HiMoon className="swap-on h-5 w-5" />
        </label>
    )
}
