import { useRecoilValue } from "recoil"

import { myPlaylists } from "../../atoms/playlistAtom"
import Cards from "../shared/Cards"

export default function MyPlaylists() {
    const playlists = useRecoilValue(myPlaylists)

    return (
        <div className="px-4 mt-6 mx-8 sm:px-6 lg:px-8 mb-40">
            <Cards playlists={playlists} title="Playlists" href="playlist" />
        </div>
    )
}
