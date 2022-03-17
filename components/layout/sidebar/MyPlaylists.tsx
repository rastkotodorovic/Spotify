import { useEffect, useState } from "react"

import useSpotify from "../../../hooks/useSpotify"
import { myPlaylists } from "../../../atoms/playlistAtom"
import {useRecoilState} from "recoil"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function MyPlaylists({ router, session }) {
    const [ playlists, setPlaylists ] = useRecoilState(myPlaylists)
    const spotifyApi = useSpotify()

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists()
                .then((data) => {
                    setPlaylists(data.body.items)
                })
        }
    }, [session, spotifyApi])

    return (
        <div className="mt-3 space-y-1" role="group" aria-labelledby="desktop-teams-headline">
            {playlists.map((playlist) => (
                <a
                    key={playlist?.id}
                    className={classNames(
                        router.asPath === `/playlist/${playlist?.id}` ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer'
                    )}
                    onClick={() => router.push(`/playlist/${playlist?.id}`)}
                >
                    <span className="truncate">{playlist?.name}</span>
                </a>
            ))}
        </div>
    )
}
