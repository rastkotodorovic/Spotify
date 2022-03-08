import { SetStateAction, useEffect, useState } from "react"
import useSpotify from "../../hooks/useSpotify"

import Tracks from "../shared/Tracks"

export default function Liked() {
    const spotifyApi = useSpotify()
    const [ tracks, setTracks ] = useState([])

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getMySavedTracks()
                .then(function(data: { body: { items: SetStateAction<never[]> } }) {
                    setTracks(data.body.items)
                })
                .catch(function(err: Error) {
                    console.log('Something went wrong!', err)
                })
        }
    }, [spotifyApi.getAccessToken()])

    return (
        <>
          <div className="px-4 mt-6 sm:px-6 lg:px-8">
            <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-3">Playlist</h2>
            <a className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img
                    className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                    src="https://us.123rf.com/450wm/artnata/artnata1702/artnata170200049/71190968-green-heart-isolated-on-transparent-background-happy-valentine-s-day-greeting-template-.jpg?ver=6"
                    alt=""
                />
                <div className="flex flex-col justify-between px-8 py-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Liked tracks
                    </h5>
                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                        {tracks?.length} tracks
                    </p>
                </div>
            </a>
          </div>
          <Tracks tracks={tracks} />
      </>
    )
}
