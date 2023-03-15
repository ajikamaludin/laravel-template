import React from "react";
import Input from "./Input";

export default function FormInput({ type, name, onChange, value, label, className, error, autoComplete, autoFocus, placeholder, disabled, readOnly}) {
    return (
        <div className={className}>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <Input
                type={type}
                name={name}
                onChange={onChange}
                value={value}
                error={error}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
            />
        </div>
    )
}