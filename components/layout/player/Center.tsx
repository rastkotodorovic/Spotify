import {
    FastForwardIcon,
    PauseIcon,
    PlayIcon,
    ReplyIcon,
    RewindIcon,
    SwitchHorizontalIcon
} from "@heroicons/react/solid";
import { useRecoilState } from "recoil";

import { isPlayingState } from "../../../atoms/trackAtom";

export default function Center({ spotifyApi }) {
    const [ isPlaying, setIsPlaying ] = useRecoilState(isPlayingState);

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState()
            .then((data) => {
                if (data.body.is_playing) {
                    spotifyApi.pause();
                    setIsPlaying(false);
                } else {
                    spotifyApi.play();
                    setIsPlaying(true);
                }
            })
    }

    return (
        <div className="flex items-center justify-evenly">
            <SwitchHorizontalIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
            <RewindIcon
                onClick={() => spotifyApi.skipToPrevious()}
                className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
            />
            {isPlaying ? (
                <PauseIcon onClick={handlePlayPause} className="w-10 h-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
            ) : (
                <PlayIcon onClick={handlePlayPause} className="w-10 h-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
            )}

            <FastForwardIcon
                onClick={() => spotifyApi.skipToNext()}
                className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
            />

            <ReplyIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"/>
        </div>
    );
}
