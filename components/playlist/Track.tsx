import { useRecoilState } from "recoil";
import { isPlayingState, trackIdState } from "../../atoms/trackAtom";
import useSpotify from "../../hooks/useSpotify";

export default function Track({ track, number }) {
    function millisToMinutesAndSeconds(millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    const spotifyApi = useSpotify();
    const [ trackId, setTrackId ] = useRecoilState(trackIdState);
    const [ isPlaying, setIsPlaying ] = useRecoilState(isPlayingState);

    const playSong = () => {
        setTrackId(track.track.id);
        setIsPlaying(true);
        spotifyApi.play({
           uris: [ track.track.uri ],
        });
    }

    return (
        <tr>
            <td className="px-6 py-4 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex items-center space-x-3 lg:pl-2">
                    <p className="text-sm text-gray-500">{++number}</p>
                    <div
                        className={'flex-shrink-0 w-2.5 h-2.5 rounded-full'}
                        aria-hidden="true"
                    />
                    <a
                        className="truncate hover:text-gray-700 cursor-pointer"
                        onClick={playSong}
                    >
                      <span>
                          {track.track.name}
                          <span className="text-gray-400 font-normal"> by {track.track.artists[0].name}</span>
                      </span>
                    </a>
                </div>
            </td>
            <td className="px-6 py-3 text-sm text-gray-500 font-medium">
                <div className="flex items-center space-x-2">
                    <div className="flex flex-shrink-0 -space-x-1">
                        {track.track.album.name}
                    </div>
                </div>
            </td>
            <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(track.track.added_at)}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center space-x-2">
                    <div className="flex flex-shrink-0 -space-x-1">
                        {millisToMinutesAndSeconds(track.track.duration_ms)}
                    </div>
                </div>
            </td>
        </tr>
    )
}
