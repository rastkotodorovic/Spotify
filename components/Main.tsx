import { MenuAlt1Icon } from "@heroicons/react/outline";
import { ChevronRightIcon, DotsVerticalIcon, SearchIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import Tracks from "./Tracks";
import useSpotify from "../hooks/useSpotify";

const projects = [
    {
        id: 1,
        title: 'Sve ili nista',
        initials: 'GA',
        team: 'Engineering',
        members: [
            {
                name: 'Dries Vincent',
                handle: 'driesvincent',
                imageUrl:
                    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                name: 'Lindsay Walton',
                handle: 'lindsaywalton',
                imageUrl:
                    'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                name: 'Courtney Henry',
                handle: 'courtneyhenry',
                imageUrl:
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                name: 'Tom Cook',
                handle: 'tomcook',
                imageUrl:
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
        ],
        totalMembers: 12,
        lastUpdated: 'March 17, 2020',
        pinned: true,
        bgColorClass: 'bg-pink-600',
    },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Main() {
    const spotifyApi = useSpotify();
    const playlistId = useRecoilValue(playlistIdState);
    const [ playlist, setPlaylist ] = useRecoilState(playlistState);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getPlaylist(playlistId)
                .then((data) => {
                    setPlaylist(data.body);
                });
        }
    }, [spotifyApi.getAccessToken(), playlistId]);

    return (
        <>
            <div className="px-4 mt-6 sm:px-6 lg:px-8">
                <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Current playlist</h2>
                <ul role="list"
                    className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-3">
                    <li className="relative col-span-1 flex shadow-sm rounded-md">
                        <div
                            className={classNames(
                                'bg-green-600',
                                'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
                            )}
                        >
                            <img src={playlist?.images[0]?.url} alt="" className="rounded-l-md" />
                        </div>
                        <div
                            className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                            <div className="flex-1 px-4 py-2 text-sm truncate">
                                <a href="#" className="text-gray-900 font-medium hover:text-gray-600">
                                    {playlist?.name}
                                </a>
                                <p className="text-gray-500">{playlist?.followers?.total} followers</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="mt-10 sm:hidden">
                <div className="px-4 sm:px-6">
                    <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Projects</h2>
                </div>
                <ul role="list" className="mt-3 border-t border-gray-200 divide-y divide-gray-100">
                    {projects.map((project) => (
                        <li key={project.id}>
                            <a href="#" className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6">
                              <span className="flex items-center truncate space-x-3">
                                <span
                                    className={classNames(project.bgColorClass, 'w-2.5 h-2.5 flex-shrink-0 rounded-full')}
                                    aria-hidden="true"
                                />
                                <span className="font-medium truncate text-sm leading-6">
                                  {project.title} <span className="truncate font-normal text-gray-500">in {project.team}</span>
                                </span>
                              </span>
                                <ChevronRightIcon
                                    className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

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
                        <Tracks projects={projects} />
                    </table>
                </div>
            </div>
        </>
    )
}
