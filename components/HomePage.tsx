import {useEffect, useState} from "react";
import { useSession } from "next-auth/react";

import useSpotify from "../hooks/useSpotify";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function HomePage() {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    const [ featuredPlaylists, setFeaturedPlaylists ] = useState([]);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getFeaturedPlaylists()
                .then((data) => {
                    setFeaturedPlaylists(data.body.playlists.items);
                });
        }
    }, [session, spotifyApi]);

    return (
        <div className="px-4 mt-6 sm:px-6 lg:px-8">
            <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Featured playlists</h2>
            <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 xl:grid-cols-3 mt-3 mb-20"
            >
                {featuredPlaylists.map((playlist) => (
                    <li className="relative col-span-1 flex shadow-sm rounded-md">
                        <div
                            className={classNames(
                                'bg-green-600',
                                'flex-shrink-0 flex items-center justify-center w-32 h-32 text-white text-sm font-medium rounded-l-md'
                            )}
                        >
                            <img src={playlist.images[0].url} alt="" className="rounded-l-md" />
                        </div>
                        <div
                            className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                            <div className="flex-1 px-4 py-2 text-sm truncate">
                                <a href="#" className="text-gray-900 font-medium hover:text-gray-600">
                                    {playlist.name}
                                </a>
                                <p className="text-gray-500">50 followers</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide mt-16">Made for Rastko Todorovic</h2>
            <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 xl:grid-cols-3 mt-3 mb-16"
            >
                <li className="relative col-span-1 flex shadow-sm rounded-md">
                    <div
                        className={classNames(
                            'bg-green-600',
                            'flex-shrink-0 flex items-center justify-center w-32 h-32 text-white text-sm font-medium rounded-l-md'
                        )}
                    >
                        <img src="" alt="" className="rounded-l-md" />
                    </div>
                    <div
                        className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                        <div className="flex-1 px-4 py-2 text-sm truncate">
                            <a href="#" className="text-gray-900 font-medium hover:text-gray-600">
                                Ime
                            </a>
                            <p className="text-gray-500">50 followers</p>
                        </div>
                    </div>
                </li>

                <li className="relative col-span-1 flex shadow-sm rounded-md">
                    <div
                        className={classNames(
                            'bg-green-600',
                            'flex-shrink-0 flex items-center justify-center w-32 h-32 text-white text-sm font-medium rounded-l-md'
                        )}
                    >
                        <img src="" alt="" className="rounded-l-md" />
                    </div>
                    <div
                        className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                        <div className="flex-1 px-4 py-2 text-sm truncate">
                            <a href="#" className="text-gray-900 font-medium hover:text-gray-600">
                                Ime
                            </a>
                            <p className="text-gray-500">50 followers</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}
