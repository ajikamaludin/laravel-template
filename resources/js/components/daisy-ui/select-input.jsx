import Label from './label'
import TextInputError from './text-input-error'

export const Option = ({ value, children }) => {
    return <option value={value}>{children}</option>
}

/**
 *
 * @param {*} param0
 * @returns
 *
 * Example :
 * <Select
 *     label={label}
 *     value={value}
 *     onChange={onChange}
 *     error={error}
 *     name={name}>
 *     <Option value={''}></Option>
 *     {options.map((option) => (
 *         <Option value={option} key={option}>
 *             {option}
 *         </Option>
 *     ))}
 * </Select>
 */
export const Select = ({
    label,
    placeholder,
    value,
    onChange = () => {},
    error,
    name,
    children,
}) => {
    return (
        <fieldset className="fieldset">
            <Label label={label} />
            <select
                className={`select select-bordered w-full ${
                    error ? 'select-error' : ''
                }`}
                name={name}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
            >
                {children}
            </select>
            <TextInputError error={error} />
        </fieldset>
    )
}

/**
 *
 * @param {*} param0
 * @returns
 *
 * Example :
 * <SelectOptionArray
 *   name={input.name}
 *   value={input.value}
 *   label={input.name}
 *   options={['a', 'b']}
 *   onChange={(e) => onChange(input, e.target.value)}
 * />
 */
export const SelectOptionArray = ({
    label,
    placeholder,
    value,
    onChange = () => {},
    error,
    name,
    options = [],
}) => {
    return (
        <Select
            label={label}
            value={value}
            onChange={onChange}
            error={error}
            name={name}
            placeholder={placeholder}
        >
            <Option value={''}></Option>
            {options.map((option) => (
                <Option value={option} key={option}>
                    {option}
                </Option>
            ))}
        </Select>
    )
}

/**
 *
 * @param {*} param0
 * @returns
 *
 * Example :
 * <SelectOptionObject
 *   name={input.name}
 *   value={input.value}
 *   label={input.name}
 *   options={{a: 'value1', b: 'value2'}}
 *   onChange={(e) => onChange(input, e.target.value)}
 * />
 */
export const SelectOptionObject = ({
    label,
    placeholder,
    value,
    onChange = () => {},
    error,
    name,
    options = {},
    defaultOption = '',
}) => {
    return (
        <Select
            label={label}
            value={value}
            onChange={onChange}
            error={error}
            name={name}
            placeholder={placeholder}
        >
            <Option value="">{defaultOption}</Option>
            {Object.keys(options).map((option) => (
                <Option value={options[option]} key={option}>
                    {options[option]}
                </Option>
            ))}
        </Select>
    )
}
