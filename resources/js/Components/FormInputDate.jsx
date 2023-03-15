import React from "react";
import DatePicker from "react-datepicker";

export default function FormInputDate({ selected, onChange, label = '', error }) {
    return (
        <div>
            {label !== '' && (
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            )}
            <DatePicker
                selected={selected}
                onChange={onChange}
                closeOnScroll={true}
                shouldCloseOnSelect={true}
                dateFormat="dd/MM/yyyy"
                className={`mb-2 bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white  ${error ? "border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500" : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"}`}
                nextMonthButtonLabel=">"
                previousMonthButtonLabel="<"
                nextYearButtonLabel=">"
                previousYearButtonLabel="<"
            />
            {error && (
                <p className="mb-2 text-sm text-red-600 dark:text-red-500">{error}</p>
            )}
        </div>
    )
}