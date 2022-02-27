import {useEffect, useState} from "react";
import {useRouter} from "next/router";

import useSpotify from "../hooks/useSpotify";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function SearchPage() {
    const spotifyApi = useSpotify();
    const router = useRouter();
    const [ tracks, setTracks ] = useState([]);
    const [ playlists, setPlaylists ] = useState([]);
    const [ artists, setArtists ] = useState([]);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.searchPlaylists(router.query.query)
                .then(function(data) {
                   setPlaylists(data.body);
                }, function(err) {
                    console.error(err);
                });

            spotifyApi.searchArtists(router.query.query)
                .then(function(data) {
                    setArtists(data.body);
                }, function(err) {
                    console.error(err);
                });

            spotifyApi.searchTracks(router.query.query)
                .then(function(data) {
                    setTracks(data.body);
                }, function(err) {
                    console.error(err);
                });
        }
    }, [spotifyApi.getAccessToken(), router.query.query]);


    return (
        <div>
            asdsad
        </div>
    )
}
