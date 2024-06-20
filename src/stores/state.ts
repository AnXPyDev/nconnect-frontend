import type { Conference } from "@/lib/remote/Models";
import { defineStore } from "pinia"

export interface State {
    loading: number
    conference?: Conference
}

export const useState = defineStore('state', {
    state: (): State => ({
        loading: 0,
        conference: undefined
    })
});