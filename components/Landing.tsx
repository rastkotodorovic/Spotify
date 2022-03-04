import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

import useSpotify from "../hooks/useSpotify"
import { useRecoilValue } from "recoil"
import { myPlaylists } from "../atoms/playlistAtom"
import Cards from "./shared/Cards"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Landing() {
    const { data: session } = useSession()
    const spotifyApi = useSpotify()
    const playlists = useRecoilValue(myPlaylists)
    const [ featuredPlaylists, setFeaturedPlaylists ] = useState([])

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getFeaturedPlaylists()
                .then((data) => {
                    setFeaturedPlaylists(data.body.playlists.items)
                    console.log(data.body.playlists.items)
                });
        }
    }, [session, spotifyApi]);

    return (
        <div className="px-4 mt-6 mb-40 sm:px-6 lg:px-8">
            <Cards playlists={featuredPlaylists} title="Featured playlists" href="playlist" />

            <Cards playlists={playlists} title="My playlists" href="playlist" />
        </div>
    )
}
