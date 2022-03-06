import { useEffect, useState } from "react"
import useSpotify from "../../hooks/useSpotify"

import Tracks from "../shared/Tracks"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Liked() {
    const spotifyApi = useSpotify()
    const [ tracks, setTracks ] = useState(null)

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getMySavedTracks()
                .then(function(data) {
                    setTracks(data.body.items)
                }, function(err) {
                    console.log('Something went wrong!', err)
                });
        }
    }, [spotifyApi.getAccessToken()])

    return (
        <>
            <div className="px-4 mt-6 sm:px-6 lg:px-8">
                <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Current playlist</h2>
                <ul role="list"
                    className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-3">
                    <li className="relative col-span-1 flex shadow-sm rounded-md">
                        <div
                            className={classNames(
                                'bg-green-600',
                                'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
                            )}
                        >
                            <img src="https://us.123rf.com/450wm/artnata/artnata1702/artnata170200049/71190968-green-heart-isolated-on-transparent-background-happy-valentine-s-day-greeting-template-.jpg?ver=6" />
                        </div>
                        <div
                            className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                            <div className="flex-1 px-4 py-2 text-sm truncate">
                                <a href="#" className="text-gray-900 font-medium hover:text-gray-600">
                                    Liked tracks
                                </a>
                                <p className="text-gray-500">23 tracks</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <Tracks tracks={tracks} />
        </>
    )
}
