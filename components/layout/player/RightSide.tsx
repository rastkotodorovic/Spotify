import { VolumeOffIcon, VolumeUpIcon } from "@heroicons/react/solid"
import { useCallback, useEffect, useState } from "react"
import { debounce } from 'lodash'
import { useRecoilValue } from "recoil"

import { isPlayingState } from "../../../atoms/trackAtom"

export default function RightSide({ spotifyApi }) {
    const [ volume, setVolume ] = useState(100)
    const isPlaying = useRecoilValue(isPlayingState)

    useEffect(() => {
        if (volume >= 0 && volume <= 100 && isPlaying) {
            debouncedAdjustVolume(volume)
        }
    }, [volume, isPlaying])

    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume)
                .catch((error) => {})
        }, 200),
        []
    )

    return (
        <div className="flex items-center space-x-3 md:space-x-4 justify-end">
            <VolumeOffIcon
                className="btn-player"
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
                className="btn-player"
                onClick={() => setVolume(100)}
            />
        </div>
    )
}
