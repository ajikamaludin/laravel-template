import { useState } from 'react'

import TextInput from './text-input'

const generateTimeOptions = (prefix = '') => {
    const options = []
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const formattedHour = hour.toString().padStart(2, '0')
            const formattedMinute = minute.toString().padStart(2, '0')

            if (prefix && !formattedHour.startsWith(prefix)) continue

            options.push(`${formattedHour}:${formattedMinute}`)
        }
    }
    return options
}

/**
 *
 * @param {*} param0
 * @returns
 *
 * Example use
 * <FormInputTime
 *     label={'Jam Pengiriman'}
 *     value={ship_time}
 *     onChange={(time) => setShipTime(time)}
 * />
 */
export default function FormInputTime({ label, value, onChange, error }) {
    const [filteredOptions, setFilteredOptions] = useState([])
    const [showOptions, setShowOptions] = useState(false)

    const handleInputChange = (e) => {
        let inputValue = e.target.value

        // Validasi input hanya angka dan karakter ':'
        const sanitizedValue = inputValue.replace(/[^0-9:]/g, '')

        // Jika user mengetik 2 karakter pertama tanpa ':' tambahkan ':'
        if (sanitizedValue.length === 2 && !sanitizedValue.includes(':')) {
            inputValue = `${sanitizedValue}:`
        } else {
            inputValue = sanitizedValue
        }

        // Jika format jam salah (lebih dari 24 jam atau menit lebih dari 59), jangan update
        const [hours, minutes] = inputValue.split(':')
        if (
            (hours && parseInt(hours, 10) > 23) ||
            (minutes && parseInt(minutes, 10) > 59)
        ) {
            return
        }

        onChange(inputValue)

        // Sembunyikan opsi jika user mengetik 4 karakter
        if (inputValue.length === 5) {
            setShowOptions(false)
        } else {
            // Filter opsi berdasarkan input
            const prefix = hours || ''
            setFilteredOptions(generateTimeOptions(prefix))
            setShowOptions(true)
        }
    }

    const handleOptionClick = (option) => {
        onChange(option)
        setShowOptions(false)
    }

    const handleFocus = () => {
        setFilteredOptions(generateTimeOptions())
        setShowOptions(true)
    }

    const handleBlur = () => {
        // Delay blur untuk memastikan klik opsi tercatat sebelum menu hilang
        setTimeout(() => setShowOptions(false), 200)
    }

    return (
        <div className="relative">
            <TextInput
                type="text"
                value={value}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="__:__"
                maxLength={5}
                label={label}
                error={error}
            />
            {showOptions && (
                <ul className="absolute z-10 mt-1 w-full bg-base-100 max-h-48 overflow-y-auto">
                    {filteredOptions.map((option) => (
                        <li
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className="text-base-content px-3 py-2 text-sm cursor-pointer hover:bg-base-200"
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
