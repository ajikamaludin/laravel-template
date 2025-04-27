import { Search } from 'lucide-react'
import { forwardRef } from 'react'

/**
 *
 * @param {*} param0
 * @returns
 *
 * Example:
 * <SearchInput
 *   onChange={(e) => setSearch(e.target.value)}
 *   value={search}
 * />
 */
const SearchInput = forwardRef((props, ref) => {
    return (
        <form>
            <label className="input w-full">
                <Search className="w-4 h-4 opacity-50" />
                <input
                    ref={ref}
                    type="search"
                    placeholder="Search"
                    {...props}
                />
            </label>
        </form>
    )
})

export default SearchInput
