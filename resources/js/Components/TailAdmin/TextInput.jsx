import React, { forwardRef } from "react";

const Label = ({ label }) => {
    if (!label) return null;

    return (
        <label
            className="mb-2.5 block font-medium text-black dark:text-white"
        >
            {label}
        </label>
    );
}

const BottomTextHelper = ({ error }) => {
    if (!error) return null;

    return (
        <p className="text-sm text-red-600 mt-2" id="hs-validation-name-error-helper">{error}</p>
    )
}

const TextInput = forwardRef((props, ref) => {
    const { label, error, ...inputProps } = props;

    const defaultClassName = `w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:text-white dark:focus:border-primary`;

    const errorClassName = `w-full rounded-lg border-danger bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-danger dark:border-form-danger dark:bg-form-input dark:text-white dark:focus:border-danger`;

    const className = error ? errorClassName : defaultClassName;

    return (
        <>
            <Label label={label} />
            <div className="relative">
                {props.prepend}
                <input
                    ref={ref}
                    {...inputProps}
                    className={`${className} ${props.className ? props.className : ''}`}
                />
                {props.append && (
                    <span className="absolute right-4 top-4">
                        {props.append}
                    </span>
                )}
            </div>
            <BottomTextHelper error={error} />
        </>
    );
});

export default TextInput;