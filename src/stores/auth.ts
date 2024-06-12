import { AuthType, type Admin, type User } from "@/lib/remote/Models";
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
    }),
    getters: {
        isAdmin: (state) => state.auth === AuthType.ADMIN,
        isUser: (state) => state.auth === AuthType.USER
    }
});

export type AuthStore = ReturnType<typeof useAuth>;