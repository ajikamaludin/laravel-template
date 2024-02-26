import { HiSearch } from 'react-icons/hi'
import TextInput from './TextInput'
import SearchIcon from './Icons/SearchIcon'

export default function SearchInput({ onChange, value }) {
    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-black dark:text-white">
                <SearchIcon/>
            </div>
            <TextInput
                placeholder="Search"
                className="pl-13 pr-4"
                onChange={onChange}
                value={value}
                autoComplete="off"
            />
        </div>
    )
}
