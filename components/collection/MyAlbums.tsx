import { useEffect, useState } from "react"

import useSpotify from "../../hooks/useSpotify"
import Cards from "../shared/Cards";

export default function MyAlbums() {
    const spotifyApi = useSpotify()
    const [ albums, setAlbums ] = useState([])

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getMySavedAlbums()
                .then(function(data) {
                    setAlbums(data.body.items)
                })
                .catch(function(err) {
                    console.log('Something went wrong!', err)
                });
        }
    }, [spotifyApi.getAccessToken()])

    return (
        <div className="px-4 mt-6 mx-8 sm:px-6 lg:px-8">
            <Cards playlists={albums} title="Albums" href="albums" />
        </div>
    )
}
