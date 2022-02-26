import { atom } from "recoil";

export const playlistIdState = atom({
    key: "playlistIdState",
    default: null,
});

export const playlistState = atom({
    key: "playlistState",
    default: null,
});

export const myPlaylists = atom({
    key: "myPlaylists",
    default: [],
});
