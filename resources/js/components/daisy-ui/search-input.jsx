import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import TextInput from './text-input'

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
export default function SearchInput({ onChange, value }) {
    return (
        <TextInput
            onChange={onChange}
            value={value}
            type="search"
            placeholder="Search..."
            icon={<HiOutlineMagnifyingGlass />}
        />
    )
}
