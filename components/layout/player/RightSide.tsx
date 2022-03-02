import { VolumeOffIcon, VolumeUpIcon } from "@heroicons/react/solid"
import { useCallback, useEffect, useState } from "react"
import { debounce } from 'lodash'

export default function RightSide({ spotifyApi }) {
    const [ volume, setVolume ] = useState(50)

    useEffect(() => {
        if (volume >= 0 && volume <= 100) {
            debouncedAdjustVolume(volume)
        }
    }, [volume])

    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume)
                .catch((error) => {})
        }, 200),
        []
    );

    return (
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
    );
}
