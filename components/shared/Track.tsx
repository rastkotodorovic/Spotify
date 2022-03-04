import { useRecoilState } from "recoil"

import { isPlayingState, seekState, trackIdState } from "../../atoms/trackAtom"
import useSpotify from "../../hooks/useSpotify"
import millisToMinutesAndSeconds from "../../lib/time"

export default function Track({ track, number }) {
    const spotifyApi = useSpotify()
    const [ trackId, setTrackId ] = useRecoilState(trackIdState)
    const [ isPlaying, setIsPlaying ] = useRecoilState(isPlayingState)
    const [ seek, setSeek ] = useRecoilState(seekState)

    const playSong = () => {
        setTrackId(track.id)
        setSeek(0)
        setIsPlaying(true)
        spotifyApi.play({
           uris: [ track.uri ],
        }).catch((err) => console.log(err))
    }

    return (
        <tr
            className={`hover:bg-gray-100 cursor-pointer ${trackId === track.id ? 'bg-gray-100' : ''}`}
            onClick={playSong}
        >
            <td className="px-6 py-4 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex items-center space-x-3 lg:pl-2">
                    <p className="text-sm text-gray-500">{++number}</p>
                    <div
                        className={'flex-shrink-0 w-2.5 h-2.5 rounded-full'}
                        aria-hidden="true"
                    />
                    <a className="truncate hover:text-gray-700 cursor-pointer">
                      <span>
                          {track.name}
                          <span className="text-gray-400 font-normal"> by {track.artists[0].name}</span>
                      </span>
                    </a>
                </div>
            </td>
            <td className="px-6 py-3 text-sm text-gray-500 font-medium">
                <div className="flex items-center space-x-2">
                    <div className="flex flex-shrink-0 -space-x-1">
                        {track?.album?.name?.substring(0, 15)}
                    </div>
                </div>
            </td>
            <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(track.added_at)}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center space-x-2">
                    <div className="flex flex-shrink-0 -space-x-1">
                        {millisToMinutesAndSeconds(track.duration_ms)}
                    </div>
                </div>
            </td>
        </tr>
    )
}
