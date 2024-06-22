import { AuthType, canSignUp, isAdmin, checkPriv, isUser } from "@/lib/remote/Auth";
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
        checkPriv: (state) => (priv?: AdminPriv) => checkPriv(state, priv),
        isAdmin: isAdmin,
        isUser: isUser,
        canSignUp: canSignUp,
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