import {
    FastForwardIcon,
    PauseIcon,
    PlayIcon,
    ReplyIcon,
    RewindIcon,
    SwitchHorizontalIcon
} from "@heroicons/react/solid"
import { useRecoilState } from "recoil"
import { debounce } from 'lodash'

import { isPlayingState, seekState } from "../../../atoms/trackAtom"
import { useCallback, useEffect } from "react"
import millisToMinutesAndSeconds from "../../../lib/time"

export default function Center({ spotifyApi, track }) {
    const [ isPlaying, setIsPlaying ] = useRecoilState(isPlayingState)
    const [ seek, setSeek ] = useRecoilState(seekState)

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState()
            .then((data) => {
                if (data.body.is_playing) {
                    spotifyApi.pause()
                    setIsPlaying(false)
                } else {
                    spotifyApi.play();
                    setIsPlaying(true)
                }
            })
    }

    useEffect(() => {
        let interval = null

        if (isPlaying) {
            interval = setInterval(() => {
                setSeek((seek) => seek + 1000)
            }, 1000);
        } else {
            clearInterval(interval)
        }

        return () => {
            clearInterval(interval)
        };
    }, [isPlaying])

    useEffect(() => {
        if (seek > track?.duration_ms) {
            spotifyApi.pause()
            setIsPlaying(false)
            setSeek(0)
        }
    }, [seek])

    function changeTrackSeek(time) {
        debouncedChangeTrackSeek(time)
        setSeek(time)
    }

    const debouncedChangeTrackSeek = useCallback(
        debounce((seek) => {
            spotifyApi.seek(seek)
                .then(function() {
                    console.log('Seek to ' + seek)
                }, function(err) {
                    console.log('Something went wrong!', err)
                });
        }, 100),
        []
    );

    return (
        <>
            <div className="flex flex-col mt-3">
                <div className="flex items-center justify-center">
                    <SwitchHorizontalIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
                    <RewindIcon
                        onClick={() => spotifyApi.skipToPrevious()}
                        className="ml-10 w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
                    />
                    {isPlaying ? (
                        <PauseIcon onClick={handlePlayPause} className="mx-10 w-11 h-11 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
                    ) : (
                        <PlayIcon onClick={handlePlayPause} className="mx-10 w-11 h-11 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
                    )}

                    <FastForwardIcon
                        onClick={() => spotifyApi.skipToNext()}
                        className="mr-10 w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
                    />

                    <ReplyIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"/>
                </div>
                <div className="flex">
                    <div className="flex-none w-14 text-center text-gray-400">
                        {millisToMinutesAndSeconds(seek)}
                    </div>
                    <div className="grow">
                        <input
                            type="range"
                            className="w-full align-middle"
                            onChange={(event) => changeTrackSeek(Number(event.target.value))}
                            value={seek}
                            min={0}
                            max={track?.duration_ms}
                        />
                    </div>
                    <div className="flex-none w-14 text-center text-gray-400">
                        {isNaN(track?.duration_ms) ? '0:00' : millisToMinutesAndSeconds(track?.duration_ms)}
                    </div>
                </div>
            </div>
        </>
    );
}
