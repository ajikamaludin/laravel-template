import { Moon, Settings2, Sun } from 'lucide-react'

export function ThemeSwitch() {
    const themes = [
        'dark',
        'business',
        'light',
        'nord',
        'dim',
        'winter',
        'cupcake',
        'corporate',
        'lofi',
        'sunset',
    ]

    return (
        <div className="dropdown dropdown-end hover:bg-base-200 p-1 rounded-2xl">
            <div
                tabIndex={0}
                role="button"
                className=""
            >
                <Settings2 className="w-5 h-5" />
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content z-1 p-2 shadow bg-base-100 w-52"
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
    )
}

export function DarkSwitch() {
    return (
        <label className="swap swap-rotate hover:bg-base-200 p-1 rounded-2xl">
            <input
                type="checkbox"
                data-toggle-theme="dark,light" // change here
                data-act-class="ACTIVECLASS"
                className="hidden theme-controller"
            />
            {/* sun icon */}
            <Moon className="swap-off h-5 w-5" />
            {/* moon icon */}
            <Sun className="swap-on h-5 w-5" />
        </label>
    )
}
