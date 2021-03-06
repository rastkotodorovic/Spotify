import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import useSpotify from "../../hooks/useSpotify"
import Cards from "../shared/Cards"
import Tracks from "../shared/Tracks"

export default function SearchPage() {
    const spotifyApi = useSpotify()
    const router = useRouter()
    const [ tracks, setTracks ] = useState([])
    const [ playlists, setPlaylists ] = useState([])
    const [ artists, setArtists ] = useState([])

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.searchPlaylists(router.query.query, {limit: 5})
                .then(function(data) {
                   setPlaylists(data.body.playlists.items)
                }, function(err) {
                    console.error(err)
                })

            spotifyApi.searchArtists(router.query.query)
                .then(function(data) {
                    setArtists(data.body.artists.items)
                }, function(err) {
                    console.error(err)
                })

            spotifyApi.searchTracks(router.query.query, { limit: 10 })
                .then(function(data) {
                    setTracks(data.body.tracks.items)
                }, function(err) {
                    console.error(err)
                })
        }
    }, [spotifyApi.getAccessToken(), router.query.query])


    return (
        <div className="px-4 mt-6 sm:px-6 lg:px-8">
            <Cards playlists={playlists} title="Playlists" href="playlist" />

            <Cards playlists={artists} title="Artists" href="artists" />

            <div className="mb-36">
                <Tracks tracks={tracks} />
            </div>
        </div>
    )
}
