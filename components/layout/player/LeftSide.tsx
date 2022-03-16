export default function LeftSide({ track }) {
    return (
        <div className="flex items-center space-x-4">
            <img
                className="hidden md:inline h-16 w-16 rounded"
                src={track?.album?.images?.[0]?.url}
                alt={track?.album?.name}
            />
            <div>
                <h3 className="text-sm">{ track?.name }</h3>
                <p className="text-xs text-gray-500">{ track?.artists?.[0]?.name }</p>
            </div>
        </div>
    )
}
