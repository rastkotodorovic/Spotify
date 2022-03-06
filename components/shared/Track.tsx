import { useRecoilState } from "recoil"

import { isPlayingState, seekState, trackIdState } from "../../atoms/trackAtom"
import useSpotify from "../../hooks/useSpotify"
import millisToMinutesAndSeconds from "../../lib/time"

export default function Track({ track, number, isFollowed, setIsFollowed }) {
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

    const handleFollow = (e) => {
        e.stopPropagation()
        if (isFollowed[number]) {
            spotifyApi.removeFromMySavedTracks([track.id])
                .then(function (data) {
                    let newArr = [...isFollowed]
                    newArr[number] = false

                    setIsFollowed(newArr)
                }, function (err) {
                    console.log('Something went wrong!', err)
                })
        } else {
            spotifyApi.addToMySavedTracks([track.id])
                .then(function (data) {
                    let newArr = [...isFollowed]
                    newArr[number] = true

                    setIsFollowed(newArr)
                }, function (err) {
                    console.log('Something went wrong!', err)
                })
        }
    }

    return (
        <tr
            className={`hover:bg-gray-100 cursor-pointer ${trackId === track.id ? 'bg-gray-100' : ''}`}
            onClick={playSong}
        >
            <td className="px-6 py-4 max-w-0 w-5/12 whitespace-nowrap text-sm font-medium text-gray-900">
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
            <td className="px-6 py-3 text-sm text-gray-500 font-medium w-4/12">
                <div className="flex items-center space-x-2">
                    <div className="flex flex-shrink-0 -space-x-1">
                        {track?.album?.name?.substring(0, 60)}
                    </div>
                </div>
            </td>
            <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(track.added_at)}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium flex justify-between text-gray-500">
                <div />
                <div>
                    <button onClick={handleFollow}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-heart mt-1" viewBox="0 0 16 16">
                            {isFollowed[number] ? (
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                            ) : (
                                <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                            )}
                        </svg>
                    </button>
                </div>
                <div>
                    {millisToMinutesAndSeconds(track.duration_ms)}
                </div>
            </td>
        </tr>
    )
}
