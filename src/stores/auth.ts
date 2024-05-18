import { AuthType, type Admin, type User } from "@/lib/Bridge";
import { defineStore } from "pinia";

interface State {
    auth: AuthType
    token?: string
    user?: User | Admin
}

export const useAuth = defineStore('auth', {
    state: (): State => ({
        auth: AuthType.NONE,
        token: undefined,
        user: undefined
    })
});

export type AuthStore = ReturnType<typeof useAuth>;