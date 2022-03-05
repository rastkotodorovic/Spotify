import { useRouter } from "next/router"
import { useEffect, useState } from "react";

import useSpotify from "../../hooks/useSpotify";
import {useSession} from "next-auth/react";

export default function Card({ playlist, href, isFollowed, index, setIsFollowed }) {
    const router = useRouter()
    const spotifyApi = useSpotify()
    const { data: session } = useSession()

    // useEffect(() => {
    //     if (spotifyApi.getAccessToken()) {
    //         switch (href) {
    //             case 'playlist':
    //                 spotifyApi.areFollowingPlaylist(playlist.owner.id, playlist.id, [session?.user?.username])
    //                     .then(function(data) {
    //                         setIsFollowing(data.body[0])
    //                     }, function(err) {
    //                         console.log('Something went wrong!', err);
    //                     });
    //                 break;
    //         }
    //     }
    // }, [spotifyApi.getAccessToken()])

    const handleFollow = (e) => {
        e.stopPropagation()
        switch (href) {
            case 'playlist':
                if (isFollowed[index]) {
                    spotifyApi.unfollowPlaylist(playlist.id)
                        .then(function (data) {
                            setIsFollowing(false);
                        }, function (err) {
                            console.log('Something went wrong!', err);
                        });
                } else {
                    spotifyApi.followPlaylist(playlist.id)
                        .then(function (data) {
                            setIsFollowing(true);
                        }, function (err) {
                            console.log('Something went wrong!', err);
                        });
                }
                break;
            case 'artists':
                if (isFollowed[index]) {
                    spotifyApi.unfollowArtists([playlist.id])
                        .then(function (data) {
                            let newArr = [...isFollowed]
                            newArr[index] = false

                            setIsFollowed(newArr)
                        }, function (err) {
                            console.log('Something went wrong!', err);
                        });
                } else {
                    spotifyApi.followArtists([playlist.id])
                        .then(function (data) {
                            let newArr = [...isFollowed]
                            newArr[index] = true

                            setIsFollowed(newArr)
                        }, function (err) {
                            console.log('Something went wrong!', err);
                        });
                }
                break;
        }
    }

    return (
        <div className="bg-gray-100 w-60 shadow-md rounded p-2">
            <div className="group relative" onClick={() => router.push(`/${href}/${playlist?.id}`)}>
                <img alt="Placeholder" className="block h-44 w-full rounded"  src={playlist?.images[0]?.url} />
                <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 duration-700 transition justify-evenly">

                    <button
                        className="hover:scale-110 text-white outline-none  opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
                        onClick={handleFollow}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                            {isFollowed[index] ? (
                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                            ) : (
                                <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                            )}
                        </svg>
                    </button>

                    <button  className="hover:scale-110 text-white outline-none opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-play-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                        </svg>
                    </button>

                    <button className="hover:scale-110 text-white outline-none opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                        </svg>
                    </button>
                </div>
            </div>
            <div className="p-2">
                <h3 className="text-gray-600 py-1 text-base justify-center">{playlist?.name}</h3>
                <p className="text-gray-400 text-sm">{playlist?.description?.substring(0, 45)}</p>
                <p className="text-gray-400 text-sm mt-1">By @{playlist?.owner?.display_name}</p>
            </div>
        </div>
    )
}
