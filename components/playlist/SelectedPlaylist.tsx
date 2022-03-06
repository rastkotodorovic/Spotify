import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import Tracks from "../shared/Tracks"
import useSpotify from "../../hooks/useSpotify"
import CurrentCard from "../shared/CurrentCard"

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
                })
        }
    }, [spotifyApi.getAccessToken(), playlistId])

    return (
        <>
            <div className="px-4 mt-6 sm:px-6 lg:px-8">
                <CurrentCard type="playlist" playlist={playlist} />
            </div>

            <Tracks tracks={playlist?.tracks.items} />
        </>
    )
}
