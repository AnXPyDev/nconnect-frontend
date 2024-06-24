import { type Admin, AdminPriv, type User } from "./Models";
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

function restoreUserSession(token: string) {
    return remote.post("user/info", {}, tokenHeader(token)).then((res: Response<{ data: User }>) => {
        const auth = useAuth();
        auth.auth = AuthType.USER;
        auth.token = token;
        auth.data = res.data;
        console.log("RESTORE USER", res);
    }).code(ApiCodes.NoAuth, (res: FailResponse) => {
        console.warn(`Failed to restore user session "${res.message}"`);
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
        case AuthType.USER:
            return restoreUserSession(auth.token);
            break;
    }
}

export interface AdminCredentials {
    username: string
    password: string
}
    
export function loginAdmin(credentials: AdminCredentials) {
    return remote.post("auth/admin/login", credentials).then((res: Response<{token: string, data: Admin}>) => {
        const auth = useAuth();
        auth.auth = AuthType.ADMIN;
        auth.token = res.token;
        auth.data = res.data;
    }).send();
}

export async function registerUser(data: User) {
    return remote.post("user/register", data).then((res: Response<{ token: string, data: User }>) => {
        const auth = useAuth();
        auth.auth = AuthType.USER;
        auth.token = res.token;
        auth.data = res.data;
        auth.data.timeslots = [];
    }).send();
}

export function dropAuth() {
    const auth = useAuth();
    auth.auth = AuthType.NONE;
    auth.token = undefined;
    auth.data = undefined;
}

export function logoutAdmin() {
    return remote.post("auth/admin/logout").then((res) => {
        dropAuth();
        router.push({ name: "admin/login" });
    }).send();
}

export async function logoutUser() {
    dropAuth();
}

export function checkPriv(state: AuthState, priv?: AdminPriv): boolean {
    if (state.auth != AuthType.ADMIN) {
        return false;
    }

    if (priv !== undefined) {
        const admin = state.data!! as Admin;
        return admin.priv >= priv;
    }

    return true;
}

export function isAdmin(state: AuthState): boolean {
    if (state.auth != AuthType.ADMIN) {
        return false;
    }

    return true;
}

export function isUser(state: AuthState): boolean {
    if (state.auth != AuthType.USER) {
        return false;
    }

    return true;
}

export function canSignUp(state: AuthState): boolean {
    if (state.auth != AuthType.NONE) {
        return false;
    }

    return true;
}