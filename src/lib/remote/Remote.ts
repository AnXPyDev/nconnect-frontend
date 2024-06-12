import type { AuthStore } from "@/stores/auth";
import axios, { Axios, AxiosError } from "axios";
import { AuthType, type Admin } from "./Models";
import router from "@/router";
import { remoteURL } from "@/config";
import Deffered from "../util/Deffered";
import RequestBuilder, { type FailResponse, type GenericResponse, type Response } from "./RequestBuilder";
import ApiCodes from "./Codes";

class Remote {
    baseURL: string;
    connection!: Axios;
    auth!: AuthStore;
    initPromise: Deffered<void>;

    constructor(baseURL: string) {
        this.initPromise = new Deffered<void>();
        this.baseURL = baseURL;
        console.log("ApiRemote constructor");
    }

    createConnection() {
        return axios.create({
            baseURL: this.baseURL
        });
    }

    async init(auth: AuthStore) {
        this.auth = auth;
        this.connection = this.createConnection();

        console.log("ApiRemote init");
        this.initPromise.resolve();
        await this.post("ping").send();
    }

    tokenHeader() {
        return {
            Authorization: this.auth.token && `Bearer ${this.auth.token}`
        }
    }

    private async postInternal(endpoint: string, data: object) {
        await this.initPromise.promise;
        const headers = {
            Accept: "application/json",
            ...this.tokenHeader()
        }
        return (await this.connection.post(endpoint, data, { headers })).data;
    }

    private async putInternal(endpoint: string, query: string, data: unknown): Promise<any> {
        const headers = {
            Accept: "application/json",
            ...this.tokenHeader()
        }
        return (await this.connection.put(`${endpoint}?${query}`, data, { headers })).data;
    }

    post(endpoint: string, data: object = {}): RequestBuilder {
        return new RequestBuilder(() => {
            return this.postInternal(endpoint, data);
        }, endpoint);
    }

    put(endpoint: string, query: object = {}, data: unknown): RequestBuilder {
        return new RequestBuilder(() => {
            return this.putInternal(endpoint, new URLSearchParams(query as any).toString(), data);
        })
    }

    async restoreAdminSession() {
        await this.post("auth/admin/info").then((res: Response<{data: Admin}>) => {
            this.auth.user = res.data;
        }).code(ApiCodes.NoAuth, (res: FailResponse<{message: string}>) => {
            console.warn(`Failed to restore admin session "${res.message}"`)
            this.auth.auth = AuthType.NONE;
            this.auth.token = undefined;
        }).catch().send();
    }

    async restoreUserSession() {
    }

    async loginAdmin() {
        await this.post("auth/admin/login").then((res: Response<{token: string, data: Admin}>) => {
            this.auth.auth = AuthType.ADMIN;
            this.auth.token = res.token;
            this.auth.user = res.data;
        }).failMessage("Failed to login as admin").catch().send();
    }

    async logoutAdmin() {
        await this.post("auth/admin/logout").then((res) => {
            this.auth.auth = AuthType.NONE;
            this.auth.token = undefined;
            this.auth.user = undefined;
            router.push({ name: "home" });
        }).failMessage("Failed to logout as admin").catch().send();
    }

    async restoreSession() {
        switch (this.auth.auth) {
            case AuthType.NONE:
                break;
            case AuthType.USER:
                return await this.restoreUserSession();
            case AuthType.ADMIN:
                return await this.restoreAdminSession();
        }
    }
}

const remote = new Remote(remoteURL);

export default remote;