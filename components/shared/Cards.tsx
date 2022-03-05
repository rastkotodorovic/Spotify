import Card from "./Card"
import {useEffect, useState} from "react";
import useSpotify from "../../hooks/useSpotify";
import {useSession} from "next-auth/react";

export default function Cards({ playlists, title, href }) {
    const spotifyApi = useSpotify()
    const { data: session } = useSession()
    const [ isFollowed, setIsFollowed ] = useState([])

    useEffect(() => {
        if (spotifyApi.getAccessToken() && playlists) {
            let ids = [];
            playlists.map((playlist) => {
                ids.push(playlist.album ? playlist.album.id : playlist.id)
            });

            switch (href) {
                case 'artists':
                    spotifyApi.isFollowingArtists(ids)
                        .then(function(data) {
                            setIsFollowed(data.body)
                        }, function(err) {
                            console.log('Something went wrong!', err);
                        })
                    break;
                case 'albums':
                    spotifyApi.containsMySavedAlbums(ids)
                        .then(function(data) {
                            setIsFollowed(data.body)
                        }, function(err) {
                            console.log('Something went wrong!', err)
                        });
                    break;
            }
        }
    }, [spotifyApi.getAccessToken(), playlists])

    return (
        <>
            <h2 className="text-gray-600 text-md font-medium tracking-wide">{title}</h2>
            <ul
                role="list"
                className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 xl:grid-cols-6 mt-5 mb-16"
            >
                {playlists?.map((playlist, index) => (
                    <Card
                        key={playlist.album ? playlist.album.id : playlist.id}
                        playlist={playlist.album ? playlist.album : playlist}
                        href={href}
                        isFollowed={isFollowed}
                        index={index}
                        setIsFollowed={setIsFollowed}
                    />
                ))}
            </ul>
        </>
    )
}
