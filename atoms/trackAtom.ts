import { atom } from "recoil"

export const trackIdState = atom({
    key: "trackIdState",
    default: null,
})

export const isPlayingState = atom({
    key: "isPlayingState",
    default: false,
})

export const seekState = atom({
    key: "seekState",
    default: 0,
})
