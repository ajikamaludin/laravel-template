import React from "react";
import { NumericFormat } from "react-number-format";
import Input from "./Input";

export default function FormInputNumeric({ name, onChange, value, label, className, error }) {
    return (
        <div className={className}>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <NumericFormat
                thousandSeparator=","
                decimalSeparator="."
                allowNegative={false}
                allowLeadingZeros={false}
                className={className}
                customInput={Input}
                value={value}
                name={name}
                onValueChange={(values) => {
                    onChange({ 
                        target: {
                            name: name,
                            value: values.floatValue
                        }
                    })
                  }}
            />
            {error && (
                <p className="mb-2 text-sm text-red-600 dark:text-red-500">{error}</p>
            )}
        </div>
    )
}