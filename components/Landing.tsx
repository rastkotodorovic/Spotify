import {useEffect, useState} from "react";
import { useSession } from "next-auth/react";

import useSpotify from "../hooks/useSpotify";
import {useRecoilValue} from "recoil";
import {myPlaylists} from "../atoms/playlistAtom";
import Card from "./shared/Card";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Landing() {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    const playlists = useRecoilValue(myPlaylists);
    const [ featuredPlaylists, setFeaturedPlaylists ] = useState([]);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getFeaturedPlaylists()
                .then((data) => {
                    setFeaturedPlaylists(data.body.playlists.items);
                    console.log(data.body.playlists.items);
                });
        }
    }, [session, spotifyApi]);

    return (
        <div className="px-4 mt-6 sm:px-6 lg:px-8">
            <h2 className="text-gray-600 text-md font-medium tracking-wide mx-4">Featured playlists</h2>
            <ul
                role="list"
                className="grid grid-cols-1 sm:gap-8 sm:grid-cols-2 xl:grid-cols-5 mt-5 mb-16 mx-4"
            >
                {featuredPlaylists.map((playlist) => (
                    <Card playlist={playlist} />
                ))}
            </ul>

            <h2 className="text-gray-600 text-md font-medium tracking-wide mx-4">My playlists</h2>
            <ul
                role="list"
                className="grid grid-cols-1 sm:gap-8 sm:grid-cols-2 xl:grid-cols-5 mt-5 mb-48 mx-4"
            >
                {playlists.map((playlist) => (
                    <Card playlist={playlist} />
                ))}
            </ul>
        </div>
    )
}
