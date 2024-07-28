import TextInput from '@/Components/DaisyUI/TextInput'
import Checkbox from '@/Components/DaisyUI/Checkbox'
import TextareaInput from '@/Components/DaisyUI/TextareaInput'
import { SelectOptionArray } from '@/Components/DaisyUI/SelectInput'
import { InputTypes } from '../constants'
import FormInputDate from '@/Components/DaisyUI/FormInputDate'

export const RenderFormInput = ({ input, onChange }) => {
    if (input.type === InputTypes.multiple) {
        return (
            <div className="form-control">
                <div className="label">
                    <span className="label-text">{input.name}</span>
                </div>
                <div className="w-full grid grid-cols-4 justify-between">
                    {input.options.split(',').map((opt) => (
                        <Checkbox
                            name={opt}
                            value={input.value === opt}
                            label={opt}
                            key={opt}
                            onChange={(e) =>
                                onChange(input, e.target.checked ? opt : '')
                            }
                        />
                    ))}
                </div>
            </div>
        )
    }

    if (input.type === InputTypes.checkbox) {
        return (
            <Checkbox
                name={input.name}
                value={+input.value === 1}
                label={input.name}
                onChange={(e) => onChange(input, e.target.checked ? 1 : 0)}
            />
        )
    }

    if (input.type === InputTypes.select) {
        return (
            <SelectOptionArray
                name={input.name}
                value={input.value}
                label={input.name}
                options={input.options.split(',')}
                onChange={(e) => onChange(input, e.target.value)}
            />
        )
    }

    if (input.type === InputTypes.date) {
        return (
            <FormInputDate
                value={input.value}
                label={input.name}
                onChange={(date) => onChange(input, date)}
            />
        )
    }

    if (input.type === InputTypes.textarea) {
        return (
            <TextareaInput
                name={input.name}
                value={input.value}
                label={input.name}
                onChange={(e) => onChange(input, e.target.value)}
            />
        )
    }

    return (
        <TextInput
            name={input.name}
            value={input.value}
            label={input.name}
            onChange={(e) => onChange(input, e.target.value)}
        />
    )
}
