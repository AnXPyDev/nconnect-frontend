import { type Admin, AdminPriv } from "./Models";
import remote from "./Remote";
import { useAuth, type AuthState } from "@/stores/auth";
import type { FailResponse, Response } from "./RequestBuilder";
import { ApiCodes } from "./Codes";
import router from "@/Router";

export enum AuthType {
    NONE, USER, ADMIN
}


export interface StoredAuth {
    auth: AuthType
    token?: string
}

export function tokenHeader(token?: string) {
    if (!token) {
        const auth = useAuth();
        token = auth.token;
    }
    return {
        Authorization: token && `Bearer ${token}`
    };
}

function restoreAdminSession(token: string) {
    return remote.post("auth/admin/info", {}, tokenHeader(token)).then((res: Response<{ data: Admin }>) => {
        const auth = useAuth();
        auth.auth = AuthType.ADMIN;
        auth.token = token;
        auth.data = res.data;
    }).code(ApiCodes.NoAuth, (res: FailResponse) => {
        console.warn(`Failed to restore admin session "${res.message}"`);
    }).send();
}

export function restoreSession(auth?: StoredAuth): Promise<void> | void {
    if (!auth || auth.auth == AuthType.NONE) {
        return;
    }

    if (!auth.token) {
        console.warn("Trying to restore session without token");
        return;
    }

    switch (auth.auth) {
        case AuthType.ADMIN:
            return restoreAdminSession(auth.token);
            break;
    }
}

export interface AdminCredentials {
    username: string
    password: string
}
    
export async function loginAdmin(credentials: AdminCredentials) {
    await remote.post("auth/admin/login", credentials).then((res: Response<{token: string, data: Admin}>) => {
        const auth = useAuth();
        auth.auth = AuthType.ADMIN;
        auth.token = res.token;
        auth.data = res.data;
    }).send();
}

function logout() {
    const auth = useAuth();
    auth.auth = AuthType.NONE;
    auth.token = undefined;
    auth.data = undefined;
}

export function logoutAdmin() {
    return remote.post("auth/admin/logout").then((res) => {
        logout();
        router.push({ name: "admin/login" });
    }).send();
}

export function isAdmin(state: AuthState, priv?: AdminPriv): boolean {
    if (state.auth != AuthType.ADMIN) {
        return false;
    }

    if (priv !== undefined) {
        const admin = state.data!! as Admin;
        return admin.priv >= priv;
    }

    return true;
}

export function isUser(state: AuthState): boolean {
    if (state.auth != AuthType.USER) {
        return false;
    }

    return true;
}