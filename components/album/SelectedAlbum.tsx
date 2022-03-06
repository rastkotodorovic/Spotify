import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import useSpotify from "../../hooks/useSpotify"
import CurrentCard from "../shared/CurrentCard"
import Tracks from "../shared/Tracks"

export default function SelectedAlbum() {
    const spotifyApi = useSpotify()
    const router = useRouter()
    const { albumId } = router.query
    const [ album, setAlbum ] = useState(null)
    const [ tracks, setTracks ] = useState([])

    useEffect(() => {
        if (spotifyApi.getAccessToken() && albumId) {
            spotifyApi.getAlbum(albumId)
                .then(function (data) {
                    setAlbum(data.body)
                    setTracks(data.body.tracks.items)
                })
                .catch(function (err) {
                    console.error(err)
                })
        }
    }, [spotifyApi.getAccessToken(), albumId])

    return (
        <>
            <div className="px-4 mt-6 sm:px-6 lg:px-8">
                <CurrentCard type="album" playlist={album} />
            </div>
            <Tracks tracks={tracks} />
        </>
    )
}
