export default function LeftSide({ track }) {
    return (
        <div className="flex items-center space-x-4">
            <img
                className="hidden md:inline h-16 w-16"
                src={track?.album?.images?.[0]?.url}
                alt=""
            />
            <div>
                <h3>{ track?.name }</h3>
                <p className="text-sm text-gray-500">{ track?.artists?.[0]?.name }</p>
            </div>
        </div>
    )
}
