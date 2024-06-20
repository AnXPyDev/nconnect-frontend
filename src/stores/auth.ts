import { AuthType, isAdmin, isUser } from "@/lib/remote/Auth";
import { AdminPriv, type Admin, type User } from "@/lib/remote/Models";
import { defineStore } from "pinia";

export interface AuthState {
    auth: AuthType
    token?: string
    data?: User | Admin
}

export const useAuth = defineStore('auth', {
    state: (): AuthState => ({
        auth: AuthType.NONE,
        token: undefined,
        data: undefined
    }),
    getters: {
        isAdmin: (state) => (priv?: AdminPriv) => isAdmin(state, priv),
        isUser: (state) => () => isUser(state),
        user: (state) => {
            if (state.auth != AuthType.USER) {
                return undefined;
            }
            return state.data!! as User;
        },
        admin: (state) => {
            if (state.auth != AuthType.ADMIN) {
                return undefined;
            }
            return state.data!! as Admin;
        }
    }
});

export type AuthStore = ReturnType<typeof useAuth>;