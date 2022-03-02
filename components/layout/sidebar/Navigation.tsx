import Link from "next/link"
import { LibraryIcon, HeartIcon, HomeIcon } from "@heroicons/react/outline"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Navigation({ router }) {
    const navigation = [
        { name: 'Home', href: '/', icon: HomeIcon, current: router.pathname === '/' },
        { name: 'Your library', href: '/collection/playlists',  icon: LibraryIcon, current: router.pathname === '/collection/playlists' },
        { name: 'Liked songs', href: '/collection/tracks',  icon: HeartIcon, current: router.pathname === '/collection/tracks' },
    ]

    return (
        <div className="space-y-1">
            {navigation.map((item) => (
                <Link href={item.href}>
                    <a
                        key={item.name}
                        className={classNames(
                            item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                    >
                        <item.icon
                            className={classNames(
                                item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                'mr-3 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                        />
                        {item.name}
                    </a>
                </Link>
            ))}
        </div>
    )
}
