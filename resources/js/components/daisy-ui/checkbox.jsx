import TextInputError from './text-input-error'
/**
 *
 * @param {*} props
 * @returns
 *
 * Example :
 * <Checkbox
 *    label="Remember me"
 *    name="remember"
 *    value={+data.remember === 1}
 *    onChange={onHandleChange}
 *    error={errors.remember}
 * />
 */
export default function Checkbox(props) {
    return (
        <>
            <fieldset className="fieldset">
                <label className="fieldset-label">
                    <input
                        name={props.name}
                        type="checkbox"
                        className="checkbox bg-base-100"
                        onChange={props.onChange}
                        checked={props.value}
                        disabled={props.disabled}
                    />
                    {props.label}
                </label>
            </fieldset>
            <TextInputError error={props.error} />
        </>
    )
}
