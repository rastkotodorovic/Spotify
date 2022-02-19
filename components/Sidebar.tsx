import { Fragment, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { ClockIcon, HomeIcon, XIcon } from "@heroicons/react/outline";
import { SearchIcon, SelectorIcon } from "@heroicons/react/solid";
import useSpotify from "../hooks/useSpotify";

const navigation = [
    { name: 'Home', href: '#', icon: HomeIcon, current: true },
    { name: 'Your library', href: '#', icon: ClockIcon, current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { data: session, status } = useSession();
    const spotifyApi = useSpotify();
    const [ playlists, setPlaylists ] = useState([]);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists()
                .then((data) => {
                    setPlaylists(data.body.items);
                });
        }
    }, [session, spotifyApi]);

    return (
        <>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 right-0 -mr-12 pt-2">
                                    <button
                                        type="button"
                                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="sr-only">Close sidebar</span>
                                        <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex-shrink-0 flex items-center px-4">
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg"
                                    alt="Workflow"
                                />
                            </div>
                            <div className="mt-5 flex-1 h-0 overflow-y-auto">
                                <nav className="px-2">
                                    <div className="space-y-1">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                                                    'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md'
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
                                        ))}
                                    </div>
                                    <div className="mt-8">
                                        <h3
                                            className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                            id="mobile-teams-headline"
                                        >
                                            Playlists
                                        </h3>
                                        <div className="mt-1 space-y-1" role="group" aria-labelledby="mobile-teams-headline">
                                            {playlists.map((playlist) => (
                                                <a
                                                    key={playlist.id}
                                                    href="#"
                                                    className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                                                >
                                                    <span className="truncate">{playlist.name}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14" aria-hidden="true">
                        {/* Dummy element to force sidebar to shrink to fit close icon */}
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-gray-100">
                <div className="flex items-center flex-shrink-0 px-6">
                    <img
                        className="h-8 w-auto"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png"
                        alt="Workflow"
                    />
                    <p className="ml-4 text-lg">Spotify</p>
                </div>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="mt-6 h-0 flex-1 flex flex-col overflow-y-auto">
                    {/* User account dropdown */}
                    <Menu as="div" className="px-3 relative inline-block text-left">
                        <div>
                            <Menu.Button className="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-500">
                          <span className="flex w-full justify-between items-center">
                            <span className="flex min-w-0 items-center justify-between space-x-3">
                              <img
                                  className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                                  src={session?.user.image}
                                  alt={session?.user.name}
                              />
                              <span className="flex-1 flex flex-col min-w-0">
                                    <span className="text-gray-900 text-sm font-medium truncate">{session?.user.name}</span>
                                  <span className="text-gray-500 text-sm truncate">@{session?.user.email}</span>
                              </span>
                            </span>
                            <SelectorIcon
                                className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                            />
                          </span>
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                View profile
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Settings
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Notifications
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Get desktop app
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Support
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                                onClick={() => signOut()}
                                            >
                                                Logout
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    {/* Sidebar Search */}
                    <div className="px-3 mt-5">
                        <label htmlFor="search" className="sr-only">
                            Search
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div
                                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                                aria-hidden="true"
                            >
                                <SearchIcon className="mr-3 h-4 w-4 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                name="search"
                                id="search"
                                className="focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
                                placeholder="Search"
                            />
                        </div>
                    </div>
                    {/* Navigation */}
                    <nav className="px-3 mt-6">
                        <div className="space-y-1">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
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
                            ))}
                        </div>
                        <div className="mt-8">
                            {/* Secondary navigation */}
                            <h3
                                className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                id="desktop-teams-headline"
                            >
                                Playlists
                            </h3>
                            <div className="mt-4 space-y-1" role="group" aria-labelledby="desktop-teams-headline">
                                {playlists.map((playlist) => (
                                    <a
                                        key={playlist.id}
                                        href="#"
                                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
                                    >
                                        <span className="truncate">{playlist.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}
