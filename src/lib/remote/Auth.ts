import { AuthType, type Admin } from "./Models";
import remote from "./Remote";
import { useAuth } from "@/stores/auth";
import type { FailResponse, Response } from "./RequestBuilder";
import ApiCodes from "./Codes";
import router from "@/router";

export interface StoredAuth {
    auth: AuthType
    token?: string
}

export function tokenHeader(token?: string) {
    if (!token) {
        token = useAuth().token;
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
        auth.user = res.data;
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
        auth.user = res.data;
    }).failMessage("Failed to login as admin").send();
}

function logout() {
    const auth = useAuth();
    auth.auth = AuthType.NONE;
    auth.token = undefined;
    auth.user = undefined;
}

export function logoutAdmin() {
    return remote.post("auth/admin/logout").then((res) => {
        logout();
        router.go(0);
    }).send();
}