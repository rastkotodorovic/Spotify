import { useRecoilState } from "recoil";
import { isPlayingState, trackIdState } from "../../atoms/songAtom";
import { useSession } from "next-auth/react";
import useSpotify from "../../hooks/useSpotify";
import useTrack from "../../hooks/useTrack";
import { useCallback, useEffect, useState } from "react";
import {
    FastForwardIcon,
    PauseIcon,
    PlayIcon,
    ReplyIcon,
    RewindIcon,
    SwitchHorizontalIcon, VolumeOffIcon, VolumeUpIcon
} from "@heroicons/react/solid";
import { debounce } from 'lodash';

export default function Player() {
    const { data: session, status } = useSession();
    const spotifyApi = useSpotify();
    const [ trackId, setTrackId ] = useRecoilState(trackIdState);
    const [ isPlaying, setIsPlaying ] = useRecoilState(isPlayingState);
    const [ volume, setVolume ] = useState(50);

    const track = useTrack();

    const getCurrentTrack = () => {
        if (! track) {
            spotifyApi.getMyCurrentPlayingTrack()
                .then((data) => setTrackId(data.body?.item?.id));

            spotifyApi.getMyCurrentPlaybackState()
                .then((data) => setIsPlaying(data.body?.is_playing));
        }
    }

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

    useEffect(() => {
        if (spotifyApi.getAccessToken() && ! trackId) {
            getCurrentTrack();
            setVolume(50);
        }
    }, [trackId, spotifyApi, session])

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume);
        }
    }, [volume])

    const debouncedAdjustVolume = useCallback(
      debounce((volume) => {
          spotifyApi.setVolume(volume).catch((error) => {});
      }, 500),
        []
    );

    return (
        <div className="h-20 bg-gray-100 border-t border-green-500 text-black grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
            <div className="flex items-center space-x-4">
                <img
                    className="hidden md:inline h-10 w-10"
                    src={track?.album?.images?.[0]?.url}
                    alt=""
                />
                <div>
                    <h3>{ track?.name }</h3>
                    <p className="text-sm text-gray-500">{ track?.artists?.[0]?.name }</p>
                </div>
            </div>

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

            <div className="flex items-center space-x-3 md:space-x-4 justify-end">
                <VolumeOffIcon
                    className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
                    onClick={() => setVolume(0)}
                />
                <input
                    className="w-14 md:w-28"
                    value={volume}
                    onChange={(event) => setVolume(Number(event.target.value))}
                    type="range"
                    min={0}
                    max={100}
                />
                <VolumeUpIcon
                    className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
                    onClick={() => setVolume(100)}
                />
            </div>
        </div>
    )
}
