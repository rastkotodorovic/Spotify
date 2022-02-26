import {useEffect, useState} from "react";
import useSpotify from "../../hooks/useSpotify";
import Tracks from "../shared/Tracks";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Liked() {
    const spotifyApi = useSpotify();
    const [ playlist, setPlaylist ] = useState(null);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getMySavedTracks()
                .then(function(data) {
                    setPlaylist(data.body);
                }, function(err) {
                    console.log('Something went wrong!', err);
                });
        }
    }, [spotifyApi.getAccessToken()]);

    return (
        <>
            <Tracks playlist={playlist} />
        </>
    )
}
