import { useRecoilValue } from "recoil";

import { myPlaylists } from "../../atoms/playlistAtom";
import {useEffect, useState} from "react";
import useSpotify from "../../hooks/useSpotify";
import {useRouter} from "next/router";
import set = Reflect.set;
import {signIn} from "next-auth/react";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function MyAlbums() {
    const spotifyApi = useSpotify();
    const [ albums, setAlbums ] = useState([]);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getMySavedAlbums()
                .then(function(data) {
                    setAlbums(data.body.items);
                }, function(err) {
                    console.log('Something went wrong!', err);
                });
        }
    }, [spotifyApi.getAccessToken()]);

    return (
        <div className="px-4 mt-6 sm:px-6 lg:px-8">
            <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 xl:grid-cols-3 mt-3 mb-20"
            >
                {Object.values(albums).map((album) => (
                    <li className="relative col-span-1 flex shadow-sm rounded-md">
                        <div
                            className={classNames(
                                'bg-green-600',
                                'flex-shrink-0 flex items-center justify-center w-32 h-32 text-white text-sm font-medium rounded-l-md'
                            )}
                        >
                            <img src={album.album.images[0]?.url} alt="" className="rounded-l-md" />
                        </div>
                        <div
                            className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                            <div className="flex-1 px-4 py-2 text-sm truncate">
                                <a href="#" className="text-gray-900 font-medium hover:text-gray-600">
                                    {album.album.name}
                                </a>
                                <p className="text-gray-500">50 followers</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
