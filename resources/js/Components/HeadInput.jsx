import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function HeadInput({ onClick }) {
    return (
        <div className="flex mb-2" onClick={onClick}>
            <input 
                type="text"
                className="rounded-none rounded-l-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pilih Barang"
                disabled={true}
            />
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <HiOutlineDotsVertical/>
            </span>
        </div>
    )
}