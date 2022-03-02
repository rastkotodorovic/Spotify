import {useEffect, useState} from "react"
import { useRouter } from "next/router"

import Tracks from "../shared/Tracks"
import useSpotify from "../../hooks/useSpotify"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function SelectedPlaylist() {
    const spotifyApi = useSpotify()
    const router = useRouter()
    const { playlistId } = router.query
    const [ playlist, setPlaylist ] = useState(null)

    useEffect(() => {
        if (spotifyApi.getAccessToken() && playlistId) {
            spotifyApi.getPlaylist(playlistId)
                .then((data) => {
                    setPlaylist(data.body)
                });
        }
    }, [spotifyApi.getAccessToken(), playlistId])

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
                            <img src={playlist?.images[0]?.url} alt="" className="rounded-l-md" />
                        </div>
                        <div
                            className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                            <div className="flex-1 px-4 py-2 text-sm truncate">
                                <a href="#" className="text-gray-900 font-medium hover:text-gray-600">
                                    {playlist?.name}
                                </a>
                                <p className="text-gray-500">{playlist?.followers?.total} followers</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <Tracks tracks={playlist?.tracks} />
        </>
    )
}
