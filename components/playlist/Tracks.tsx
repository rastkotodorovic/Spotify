import { useRecoilValue } from "recoil";

import { playlistState } from "../../atoms/playlistAtom";
import Track from "./Track";

export default function Tracks() {
    const playlist = useRecoilValue(playlistState);

    return (
        <tbody className="bg-white divide-y divide-gray-100">
            {playlist?.tracks.items.map((track, index) => (
                <Track key={track.track.id} track={track} number={index} />
            ))}
        </tbody>
    )
}
