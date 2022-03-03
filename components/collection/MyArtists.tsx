
import { useEffect, useState } from "react"

import useSpotify from "../../hooks/useSpotify"
import Cards from "../shared/Cards"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function MyArtists() {
    const spotifyApi = useSpotify()
    const [ artists, setArtists ] = useState(null)

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getFollowedArtists()
                .then(function(data) {
                    setArtists(data.body.artists.items)
                }, function(err) {
                    console.log('Something went wrong!', err)
                });
        }
    }, [spotifyApi.getAccessToken()])

    if (artists?.total === 0) {
        return (
            <div>
                No artists
            </div>
        )
    }

    return (
        <div className="px-4 mt-6 sm:px-6 lg:px-8">
            <Cards playlists={artists} title="Artists" href="artists" />
        </div>
    )
}
