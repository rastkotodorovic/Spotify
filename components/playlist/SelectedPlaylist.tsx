import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import Tracks from "../shared/Tracks"
import useSpotify from "../../hooks/useSpotify"
import CurrentCard from "../shared/CurrentCard"

interface Playlist {
    tracks: { items: any[] };
    id: string;
    owner: any[];
}

export default function SelectedPlaylist() {
    const spotifyApi = useSpotify()
    const router = useRouter()
    const { playlistId } = router.query
    const [ playlist, setPlaylist ] = useState(null as unknown as Playlist)
    const [ tracks, setTracks ] = useState<string[]>([])
    const [ offset, setOffset ] = useState(0)

    useEffect(() => {
        setTracks([])
        setOffset(0)
    }, [playlistId])

    useEffect(() => {
        if (spotifyApi.getAccessToken() && playlistId) {
            spotifyApi.getPlaylist(playlistId)
                .then((data) => {
                    setPlaylist(data.body)
                })

            spotifyApi.getPlaylistTracks(playlistId, { offset: offset, limit: 20 })
                .then((data) => {
                    if (tracks.length) {
                        setTracks((oldArray) => [...oldArray, ...data.body.items])
                    } else {
                        setTracks(data.body.items)
                    }
                })
        }
    }, [spotifyApi.getAccessToken(), playlistId, offset])

    return (
        <>
            <div className="px-4 mt-6 sm:px-6 lg:px-8">
                <CurrentCard type="playlist" playlist={playlist} />
            </div>

            <Tracks tracks={tracks} setOffset={setOffset} />
        </>
    )
}
