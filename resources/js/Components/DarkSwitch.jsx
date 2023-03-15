import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'
import React, { useEffect, useState } from 'react'

export default function DarkSwitch() {
    const [isDark, setIsDark] = useState(localStorage.theme ? false : true)

    const toggle = () => {
        localStorage.theme === 'dark' ? localStorage.setItem('theme', 'light') : localStorage.setItem('theme', 'dark')
        setIsDark(!isDark)
    }

    useEffect(() => {
        if (localStorage.getItem('theme') === null ) {
        localStorage.setItem('theme', 'dark')
        }
    }, [])

    useEffect(() => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDark])

    return (
        <div onClick={toggle} title="switch to dark mode">
            {isDark ? (
                <HiOutlineMoon className="w-6 h-6 dark:text-white" />
            ) : (
                <HiOutlineSun className="w-6 h-6 dark:text-white" />
            )}
        </div>
    )
}