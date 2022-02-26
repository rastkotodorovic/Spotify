import {useEffect, useState} from "react";
import useSpotify from "../../hooks/useSpotify";
import Tracks from "../shared/Tracks";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function MyPlaylists() {
    const spotifyApi = useSpotify();
    const [ playlist, setPlaylist ] = useState(null);


    return (
        <div>
            hi
        </div>
    )
}
