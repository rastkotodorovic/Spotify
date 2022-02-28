import Card from "./Card";

export default function Cards({ playlists, title }) {
    return (
        <>
            <h2 className="text-gray-600 text-md font-medium tracking-wide mx-6">{title}</h2>
            <ul
                role="list"
                className="grid grid-cols-1 gap-x-5 gap-y-16 sm:grid-cols-2 xl:grid-cols-5 mt-5 mb-16 mx-6"
            >
                {playlists.map((playlist) => (
                    <Card key={playlist.id} playlist={playlist} />
                ))}
            </ul>
        </>
    )
}
