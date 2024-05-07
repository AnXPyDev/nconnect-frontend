import type { User } from "@/lib/User"
import { defineStore } from "pinia";

interface State {
    auth: boolean
    token?: string
    user?: User
}

export const useAuth = defineStore('auth', {
    state: (): State => ({
        auth: false,
        token: undefined,
        user: undefined
    })
});