import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import useSpotify from "../../hooks/useSpotify"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function CurrentCard({ type, playlist }) {
    const spotifyApi = useSpotify()
    const [ isFollowing, setIsFollowing ] = useState(false)
    const { data: session } = useSession()

    useEffect(() => {
      if (spotifyApi.getAccessToken() && playlist) {
          if (type === playlist) {
            spotifyApi.areFollowingPlaylist(playlist.owner.id, playlist.id, [session.user.username])
              .then(function(data) {
                  setIsFollowing(data.body[0])
              }, function(err) {
                  console.log('Something went wrong!', err)
              });
          } else if (type === 'artist') {
              spotifyApi.isFollowingArtists([playlist.id])
                .then(function(data) {
                    setIsFollowing(data.body[0])
                }, function(err) {
                    console.log('Something went wrong!', err)
                });
          }
      }
    }, [spotifyApi.getAccessToken(), playlist])

    const handleFollow = () => {
        if (type === 'playlist') {
            if (isFollowing) {
              spotifyApi.unfollowPlaylist(playlist.id)
                  .then(function(data) {
                      setIsFollowing(false)
                  }, function(err) {
                      console.log('Something went wrong!', err)
                  })
            } else {
                spotifyApi.followPlaylist(playlist.id)
                    .then(function(data) {
                        setIsFollowing(true)
                    }, function(err) {
                        console.log('Something went wrong!', err)
                    })
            }
        } else if (type === 'artist') {
            if (isFollowing) {
              spotifyApi.unfollowArtists([playlist.id])
                  .then(function(data) {
                      setIsFollowing(false)
                  }, function(err) {
                      console.log('Something went wrong!', err)
                  })
            } else {
                spotifyApi.followPlaylist([playlist.id])
                    .then(function(data) {
                        setIsFollowing(true)
                    }, function(err) {
                        console.log('Something went wrong!', err)
                    })
            }
        }
    }

    return (
      <>
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Current {type}</h2>
          <ul role="list" className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-3">
              <li className="relative col-span-1 flex shadow-sm rounded-md">
                  <div
                      className={classNames(
                          'bg-green-600',
                          'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
                      )}
                  >
                      <img src={playlist.images ? playlist?.images[0]?.url : ''} alt="" className="rounded-l-md" />
                  </div>
                  <div
                      className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate flex justify-between">
                      <div className="flex-1 px-4 py-2 text-sm truncate">
                          <a href="#" className="text-gray-900 font-medium hover:text-gray-600">
                              {playlist?.name}
                          </a>
                          <p className="text-gray-500">{playlist?.followers?.total} followers</p>
                      </div>
                      <div>
                          <button
                              className="text-black mr-5"
                              onClick={handleFollow}
                          >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                  {isFollowing ? (
                                      <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                  ) : (
                                      <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                  )}
                              </svg>
                          </button>
                      </div>
                  </div>
              </li>
          </ul>
      </>
    )
}