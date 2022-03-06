import {useEffect, useState} from "react"
import {useRouter} from "next/router"

import useSpotify from "../../hooks/useSpotify"
import Cards from "../shared/Cards"
import Tracks from "../shared/Tracks"
import CurrentCard from "../shared/CurrentCard"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function SelectedArtist() {
    const spotifyApi = useSpotify()
    const router = useRouter()
    const [ tracks, setTracks ] = useState([])
    const [ albums, setAlbums ] = useState([])
    const [ artists, setArtists ] = useState([])
    const [ artist, setArtist ] = useState([])
    const [ isFollowing, setIsFollowing ] = useState(false)
    const { artistId } = router.query

    useEffect(() => {
        if (spotifyApi.getAccessToken() && artistId) {
          spotifyApi.getArtist(artistId)
          .then(function(data) {
            setArtist(data.body)
          }, function(err) {
            console.error(err);
          });

          spotifyApi.getArtistTopTracks(artistId, 'GB')
          .then(function(data) {
                setTracks(data.body.tracks)
              }, function(err) {
                console.log('Something went wrong!', err)
            });

            spotifyApi.getArtistRelatedArtists(artistId)
            .then(function(data) {
              setArtists(data.body.artists);
            })

            spotifyApi.getArtistAlbums(artistId, { limit: 12 })
            .then(function(data) {
              setAlbums(data.body.items);
            }, function(err) {
              console.error(err);
            });
        }
    }, [spotifyApi.getAccessToken(), artistId]);

    return (
        <div className="px-4 mt-6 mx-8 sm:px-6 lg:px-8">
            <CurrentCard type="artist" playlist={artist} />

            <Cards playlists={albums} title="Albums" href="albums" />
            <div className="my-20">
              <Tracks tracks={tracks} />
            </div>
            <Cards playlists={artists} title="Related artists" href="artists" />
        </div>
    )
}