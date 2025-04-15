import Label from './label'
import 'cally'
import { useEffect, useRef, useState } from 'react'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2'
import TextInputError from './text-input-error'
import { formatDate } from '@/utils'

/**
 *
 * @param {*} param0
 * @returns
 *
 * Example :
 * <FormInputDate
 *     value={data.date}
 *     label={'Date'}
 *     onChange={(date) => onChange(input, date)}
 * />
 */
export default function FormInputDate({
    value,
    onChange,
    label,
    error,
    placeholder = 'DD/MM/YYYY',
}) {
    const myDatepicker = useRef(null)
    const popover = useRef(null)

    const [showValue, setShowValue] = useState(placeholder)

    // make sure each component trigger only to that component
    const id = Math.random().toString(36).slice(2)

    useEffect(() => {
        if (value) {
            setShowValue(formatDate(value))
        }
    }, [value])

    useEffect(() => {
        if (myDatepicker.current !== null) {
            myDatepicker.current.addEventListener('change', (e) => {
                onChange(e.target.value)
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
                popovertarget={`popover-${id}`}
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
                popover="manual"
                id={`popover-${id}`}
                className="dropdown bg-base-100 rounded-box shadow-lg"
                style={{ positionAnchor: `--cally${id}` }}
                ref={popover}
            >
                {/* pure html not react components */}
                <calendar-date class="cally" ref={myDatepicker}>
                    <HiArrowLeft slot="previous" />
                    <HiArrowRight slot="next" />
                    <calendar-month></calendar-month>
                </calendar-date>
            </div>
        </fieldset>
    )
}
