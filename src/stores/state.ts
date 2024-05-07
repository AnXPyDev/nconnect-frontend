import { defineStore } from "pinia"

export interface State {
    loading: number
}

export const useState = defineStore('state', {
    state: (): State => ({
        loading: 0
    })
});