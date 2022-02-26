import { ChevronLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Link from 'next/link'

export default function Header({ children }) {
    const router = useRouter();
    console.log(router);
    return (
        <div className="lg:pl-64 flex flex-col">
            <main className="flex-1">
                <div
                    className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <div className="flex justify-between">
                        <ChevronLeftIcon
                            className="w-8 h-8 mr-6 bg-gray-100 p-1 rounded-full cursor-pointer"
                            onClick={() => router.back()}
                        />
                        {/*<ChevronRightIcon*/}
                        {/*    className="w-8 h-8 bg-gray-100 p-1 rounded-full cursor-pointer"*/}
                        {/*/>*/}
                        {router.pathname === '/collection/playlists' || router.pathname === '/collection/albums' || router.pathname === '/collection/artists' ? (
                            <>
                                <Link href="/collection/playlists">
                                    <p className="mr-2 cursor-pointer">
                                        Playlists
                                    </p>
                                </Link>
                                <Link href="/collection/artists" className="mr-2 cursor-pointer">
                                    <p className="mr-2 cursor-pointer">
                                        Artists
                                    </p>
                                </Link>
                                <Link href="/collection/albums">
                                    <p className="cursor-pointer">
                                        Albums
                                    </p>
                                </Link>
                            </>
                            ) : ''}
                    </div>
                    <div className="mt-4 flex sm:mt-0 sm:ml-4">
                        <button
                            type="button"
                            className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:order-1 sm:ml-3"
                        >
                            Create playlist
                        </button>
                    </div>
                </div>
                {children}
            </main>
        </div>
    )
}
