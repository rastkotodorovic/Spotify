import { useCallback, useEffect, useState } from "react"
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
import millisToMinutesAndSeconds from "../../../lib/time"

export default function Center({ spotifyApi, track, changeSong }) {
    const [ isPlaying, setIsPlaying ] = useRecoilState(isPlayingState)
    const [ seek, setSeek ] = useRecoilState(seekState)
    const [ shuffle, setShuffle ] = useState(false)

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState()
            .then((data) => {
                if (data?.body?.is_playing) {
                    spotifyApi.pause()
                        .then(function() {
                            setIsPlaying(false)
                        }).catch((err: Error) => console.log(err))
                } else {
                    spotifyApi.play()
                        .then(function() {
                            setIsPlaying(true)
                        }).catch((err: Error) => console.log(err))
                }
            })
    }

    let interval
    useEffect(() => {
        if (isPlaying) {
            interval = setInterval(() => {
                setSeek((seek) => seek + 1000)
            }, 1000)
        } else {
            if (interval) {
                clearInterval(interval)
            }
        }

        return () => {
            clearInterval(interval)
        }
    }, [isPlaying])

    useEffect(() => {
        if (seek > track?.duration_ms) {
            clearInterval(interval)
            changeSong()
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
                })
        }, 100),
        []
    )

    const handleShuffle = () => {
        spotifyApi.setShuffle(! shuffle)
        setShuffle(! shuffle)
    }

    return (
        <>
            <div className="flex flex-col mt-3">
                <div className="flex items-center justify-center">
                    <SwitchHorizontalIcon
                        className={`btn-player ${shuffle ? 'fill-green-500' : ''}`}
                        onClick={handleShuffle}
                    />
                    <RewindIcon
                        onClick={() => spotifyApi.skipToPrevious()}
                        className="ml-10 btn-player"
                    />
                    {isPlaying ? (
                        <PauseIcon onClick={handlePlayPause} className="btn-play" />
                    ) : (
                        <PlayIcon onClick={handlePlayPause} className="btn-play" />
                    )}

                    <FastForwardIcon
                        onClick={() => spotifyApi.skipToNext()}
                        className="mr-10 btn-player"
                    />

                    <ReplyIcon
                        className="btn-player"
                        onClick={() => spotifyApi.setRepeat('track')}
                    />
                </div>
                <div className="flex">
                    <div className="flex-none w-14 text-center text-gray-500 text-sm mt-1">
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
                    <div className="flex-none w-14 text-center text-gray-500 text-sm mt-1">
                        {isNaN(track?.duration_ms) ? '0:00' : millisToMinutesAndSeconds(track?.duration_ms)}
                    </div>
                </div>
            </div>
        </>
    )
}
