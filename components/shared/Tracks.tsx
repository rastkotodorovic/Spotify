import {useCallback, useEffect, useRef, useState} from "react"

import Track from "./Track"
import useSpotify from "../../hooks/useSpotify"

export default function Tracks({ tracks, setOffset = null }) {
    const spotifyApi = useSpotify()
    const [ isFollowed, setIsFollowed ] = useState([])

    const observer = useRef()
    const lastTrackRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setOffset((prevOffset) => prevOffset + 20)
            }
        })
        if (node) observer.current.observe(node)
    }, [])

    useEffect(() => {
        if (spotifyApi.getAccessToken() && tracks?.length) {
            let ids: string[] = []
            tracks.map((track) => {
                ids.push(track.track ? track.track.id : track.id)
            })

            spotifyApi.containsMySavedTracks(ids.slice(0, 50))
                .then(function(data) {
                    setIsFollowed(data.body)
                })
                .catch(function(err: Error) {
                    console.log('Something went wrong!', err)
                })
        }
    }, [spotifyApi.getAccessToken(), tracks])

    // @ts-ignore
    return (
        <div className="hidden mt-8 sm:block mb-24">
            <div className="align-middle inline-block min-w-full border-b border-gray-200">
                <table className="min-w-full">
                    <thead>
                    <tr className="border-t border-gray-200">
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <span className="lg:pl-2">Title</span>
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Album
                        </th>
                        <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date added
                        </th>
                        <th className="hidden md:table-cell px-6 py-3 border-b align-right border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {/*<ClockIcon className="w-5 h-5" />*/}
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                    {tracks?.map((track, index: number) => {
                        if (tracks.length === index + 1 && setOffset) {
                            return (
                                <Track
                                    lastTrack={lastTrackRef}
                                    key={index}
                                    track={track.track ? track.track : track}
                                    number={index}
                                    isFollowed={isFollowed}
                                    setIsFollowed={setIsFollowed}
                                />
                            )
                        } else {
                            return (
                                <Track
                                    key={index}
                                    track={track.track ? track.track : track}
                                    number={index}
                                    isFollowed={isFollowed}
                                    setIsFollowed={setIsFollowed}
                                />
                            )
                        }
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
