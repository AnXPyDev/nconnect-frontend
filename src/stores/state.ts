import type { Conference } from "@/lib/remote/Models";
import { Theme } from "@/lib/theme/Theme";
import { defineStore } from "pinia"

export interface State {
    loading: number
    conference?: Conference
    theme: Theme
}

export const useState = defineStore('state', {
    state: (): State => ({
        loading: 0,
        conference: undefined,
        theme: Theme.Light
    })
});