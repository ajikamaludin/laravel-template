const Card = ({children}) => {
    return (
        <div className="p-4 shadow border rounded-lg bg-white dark:bg-slate-800 dark:border-gray-700 dark:shadow-slate-700/[.7] flex flex-col text-gray-800 dark:text-gray-200">
            {children}
        </div>
    )
}

export default Card