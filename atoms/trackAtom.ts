import { atom } from "recoil";

export const trackIdState = atom({
    key: "trackIdState",
    default: null,
});

export const isPlayingState = atom({
    key: "isPlayingState",
    default: false,
});
