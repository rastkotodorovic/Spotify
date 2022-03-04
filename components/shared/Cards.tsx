import Card from "./Card"

export default function Cards({ playlists, title, href }) {
    return (
        <>
            <h2 className="text-gray-600 text-md font-medium tracking-wide">{title}</h2>
            <ul
                role="list"
                className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 xl:grid-cols-6 mt-5 mb-16"
            >
                {playlists?.map((playlist) => (
                    <Card key={playlist.id} playlist={playlist} href={href} />
                ))}
            </ul>
        </>
    )
}
