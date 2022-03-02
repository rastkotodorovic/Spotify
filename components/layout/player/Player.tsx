import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { useSession } from "next-auth/react"

import LeftSide from './LeftSide'
import RightSide from "./RightSide"
import Center from "./Center"
import { isPlayingState, trackIdState } from "../../../atoms/trackAtom"
import useSpotify from "../../../hooks/useSpotify"
import useTrack from "../../../hooks/useTrack"

export default function Player() {
    const { data: session } = useSession()
    const spotifyApi = useSpotify()
    const [ trackId, setTrackId ] = useRecoilState(trackIdState)
    const [ isPlaying, setIsPlaying ] = useRecoilState(isPlayingState)
    const track = useTrack()

    useEffect(() => {
        if (spotifyApi.getAccessToken() && ! trackId) {
            getCurrentTrack()
        }
    }, [trackId, spotifyApi, session])

    const getCurrentTrack = () => {
        if (! track) {
            spotifyApi.getMyCurrentPlayingTrack()
                .then((data) => setTrackId(data.body?.item?.id))

            spotifyApi.getMyCurrentPlaybackState()
                .then((data) => setIsPlaying(data.body?.is_playing))
        }
    };

    return (
        <div className="h-24 bg-gray-100 border-t border-green-500 text-black grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
            <LeftSide track={track} />

            <Center spotifyApi={spotifyApi} track={track} />

            <RightSide spotifyApi={spotifyApi} />
        </div>
    )
}
