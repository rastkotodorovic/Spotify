import { SearchIcon } from "@heroicons/react/outline";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { debounce } from 'lodash';

export default function SearchInput() {
    const router = useRouter();

    const debouncedSearch = useCallback(
        debounce((query) => {
            query ? router.push(`/search?query=${query}`) : router.push('/');
        }, 200),
        []
    );

    return (
        <div className="px-3 mt-5">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    aria-hidden="true"
                >
                    <SearchIcon className="mr-3 h-4 w-4 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    type="text"
                    name="search"
                    id="search"
                    className="focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search"
                    onChange={(e) => debouncedSearch(e.target.value)}
                />
            </div>
        </div>
    )
}
