import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import useSpotify from "./useSpotify";
import {useRecoilState} from "recoil";
import {trackIdState} from "../atoms/songAtom";

export default function useTrack() {
    const [ trackId, setTrackId ] = useRecoilState(trackIdState);
    const spotifyApi = useSpotify();
    const [ track, setTrack ] = useState(null);

    useEffect(() => {
        const getSong = async () => {
            if (trackId) {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${trackId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                        }
                    }
                ).then((res) => res.json());

                setTrack(trackInfo);
            }
        }

        getSong();
    }, [trackId])

    return track;
}
