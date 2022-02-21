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

export default function Center({ spotifyApi, track }) {
    function millisToMinutesAndSeconds(millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

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
        <>
            <div className="flex flex-col mt-5">
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
                <div className="flex mt-2">
                    <div className="flex-none w-14 text-center text-gray-400">
                        0:00
                    </div>
                    <div className="grow">
                        <input
                            type="range"
                            className="w-full align-middle"
                            min={0}
                            max={track?.duration_ms}
                        />
                    </div>
                    <div className="flex-none w-14 text-center text-gray-400">
                        {millisToMinutesAndSeconds(track?.duration_ms)}
                    </div>
                </div>
            </div>
        </>
    );
}
