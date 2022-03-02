import Track from "./Track"

export default function Tracks({ tracks }) {
    return (
        <div className="hidden mt-8 sm:block">
            <div className="align-middle inline-block min-w-full border-b border-gray-200">
                <table className="min-w-full">
                    <thead>
                    <tr className="border-t border-gray-200">
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <span className="lg:pl-2">Title</span>
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Album
                        </th>
                        <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date added
                        </th>
                        <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                    {tracks?.items?.map((track, index) => (
                        <Track
                            key={track.track ? track.track.id : track.id}
                            track={track.track ? track.track : track}
                            number={index}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
