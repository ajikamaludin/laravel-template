import 'cally'
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import TextInputError from './text-input-error'
import Label from './label'
import { formatDate } from '@/utils'

/**
 *
 *
 * Example :
 * // {start_date: '', end_date: ''}
 * <FormInputDateRange
 *     value={dates}
 *     label={'Date Range'}
 *     onChange={(dates) => handle(input, date)}
 *      errors={errors.dates}
 * />
 */
export default function FormInputDateRange({
    value,
    onChange,
    label = '',
    error,
    placeholder = 'DD/MM/YYYY - DD/MM/YYYY',
}) {
    const myDatepicker = useRef(null)
    const popover = useRef(null)

    const [showValue, setShowValue] = useState(placeholder)

    // make sure each component trigger only to that component
    const id = Math.random().toString(36).slice(2)

    useEffect(() => {
        if (value) {
            const { start_date, end_date } = value
            setShowValue(`${formatDate(start_date)} - ${formatDate(end_date)}`)
        }
        if (value === null) {
            setShowValue(placeholder)
        }
    }, [value])

    useEffect(() => {
        if (myDatepicker.current !== null) {
            myDatepicker.current.addEventListener('change', (e) => {
                const [start_date, end_date] = e.target.value.split('/')
                onChange({ start_date, end_date })
                if (popover.current) {
                    popover.current.hidePopover()
                }
            })
        }
    }, [myDatepicker])

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (popover.current && !popover.current.contains(e.target)) {
                popover.current.hidePopover()
            }
        }
        document.addEventListener('click', checkIfClickedOutside)
        return () => {
            document.removeEventListener('click', checkIfClickedOutside)
        }
    }, [popover])

    return (
        <fieldset className="fieldset">
            <Label label={label} />
            <button
                popovertarget={`cally-popover${id}`}
                className={`input input-border w-full ${
                    error ? 'input-error' : ''
                }`}
                id={`cally${id}`}
                style={{ anchorName: `--cally${id}` }}
            >
                {showValue}
            </button>
            <TextInputError error={error} />
            <div
                popover="auto"
                id={`cally-popover${id}`}
                className="dropdown bg-base-100 rounded-box shadow-lg"
                style={{ positionAnchor: `--cally${id}` }}
                ref={popover}
            >
                {/* pure html not react components */}
                <calendar-range
                    class="cally"
                    ref={myDatepicker}
                >
                    <ChevronLeft
                        slot="previous"
                        className="text-base-content"
                    />
                    <ChevronRight
                        slot="next"
                        className="text-base-content"
                    />
                    <calendar-month></calendar-month>
                </calendar-range>
            </div>
        </fieldset>
    )
}
