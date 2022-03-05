import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

import useSpotify from "../hooks/useSpotify"
import { useRecoilValue } from "recoil"
import { myPlaylists } from "../atoms/playlistAtom"
import Cards from "./shared/Cards"
import Tracks from "./shared/Tracks";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Landing() {
    const { data: session } = useSession()
    const spotifyApi = useSpotify()
    const [ featuredPlaylists, setFeaturedPlaylists ] = useState([])
    const [ topArtists, setTopArtists ] = useState([]);
    const [ topTracks, setTopTracks ] = useState([]);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getFeaturedPlaylists()
                .then((data) => {
                    setFeaturedPlaylists(data.body.playlists.items)
                    console.log(data.body.playlists.items)
                });

            spotifyApi.getMyTopArtists()
                .then(function(data) {
                    setTopArtists(data.body.items);
                }, function(err) {
                    console.log('Something went wrong!', err);
                });

            spotifyApi.getMyTopTracks({ limit: 10 })
                .then(function(data) {
                    setTopTracks(data.body.items);
                }, function(err) {
                    console.log('Something went wrong!', err);
                });
        }
    }, [session, spotifyApi]);

    return (
        <div className="px-4 mt-6 mb-40 mx-8 sm:px-6 lg:px-8">
            <Cards playlists={featuredPlaylists} title="Featured playlists" href="playlist" />

            <Cards playlists={topArtists} title="My top artists" href="artists" />

            <h2 className="text-gray-600 text-md font-medium tracking-wide">My top tracks</h2>
            <Tracks tracks={topTracks} />
        </div>
    )
}
