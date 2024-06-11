import type { AuthStore } from "@/stores/auth";
import axios, { Axios, AxiosError } from "axios";
import { AuthType, type Admin } from "./Bridge";
import router from "@/router";
import { remoteURL } from "@/config";
import Deffered from "./Deffered";

export enum ApiCodes {
    Ok = 0,
    BadInput = 1,
    NoAuth = 666,
    NoPriv = 667,
    Overlap = 992,
    Occupied = 993,
    Empty = 994
};

export class ApiException extends Error {
    code: number;
    data: object;

    constructor(code: number, data: object) {
        super();
        this.code = code;
        this.data = data;
    }

    handle(code: number, handler: (data: any) => void) {
        if (code === this.code) {
            handler(this.data);
        }
        return this;
    }
}

type Handler = (data: any) => Promise<any> | void;
type Callback = () => Promise<any>;

interface GenericErrorResponse {
    code: number;
    message?: string;
}

class RequestConstructor {
    callback!: Callback;
    name?: string;
    handlers: Map<ApiCodes, Handler> = new Map();
    exceptionHandler?: Handler;
    nonzeroHandler?: Handler;
    anyHandler?: Handler;


    constructor(callback: Callback, name?: string) {
        this.callback = callback;
        this.name = name;
    }

    then(handler: Handler) {
        this.code(ApiCodes.Ok, handler);
        return this;
    }

    any(handler: Handler) {
        this.anyHandler = handler;
        return this;
    }

    fail(handler: (response: GenericErrorResponse) => void) {
        this.nonzeroHandler = handler;
        return this;
    }

    failMessage(message: string = `Request ${this.name ?? "?"} failed`) {
        return this.fail((res) => {
            console.error(`${message}: ${res.code} => ${res.message}`);
        });
    }
    
    code(code: ApiCodes, handler: Handler) {
        this.handlers.set(code, handler);
        return this;
    }

    catch(handler: (exception: unknown) => void = (e) => {console.error(e)}) {
        this.exceptionHandler = handler;
        return this;
    }

    unwrap() {
        this.then((res) => res);
        return this;
    }

    async send(): Promise<any> {
        try {
            const res = await this.callback();
            const code = res.code ?? 0;

            if (!(code in ApiCodes)) {
                console.warn(`Result code ${code} not in ApiCodes`);
            }

            const handler = this.handlers.get(code);


            if (!handler) {
                if (code != ApiCodes.Ok && this.nonzeroHandler) {
                    return await this.nonzeroHandler(res);
                }

                if (this.anyHandler) {
                    return await this.anyHandler(res);
                }

                if (code == ApiCodes.Ok) {
                    return;
                }

                throw new Error(`Result code ${code} not handled`);
            }

            return await handler(res);
        } catch (e) {
            if (this.exceptionHandler) {
                return await this.exceptionHandler(e);
            }

            throw e;
        }
    }
}

export class ApiRemote {
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


    async postExcept(endpoint: string, data: object = {}): Promise<any> {
        const res = await this.postInternal(endpoint, data);

        if (res.code) {
            throw new ApiException(res.code, res);
        }

        return res;
    }

    private async putInternal(endpoint: string, query: string, data: unknown): Promise<any> {
        const headers = {
            Accept: "application/json",
            ...this.tokenHeader()
        }
        return (await this.connection.put(`${endpoint}?${query}`, data, { headers })).data;
    }

    post(endpoint: string, data: object = {}): RequestConstructor {
        return new RequestConstructor(() => {
            return this.postInternal(endpoint, data);
        }, endpoint);
    }

    put(endpoint: string, query: object = {}, data: unknown): RequestConstructor {
        return new RequestConstructor(() => {
            return this.putInternal(endpoint, new URLSearchParams(query as any).toString(), data);
        })
    }

    async restoreAdminSession() {
        await this.post("auth/admin/info").then((res: {data: Admin}) => {
            this.auth.user = res.data;
        }).code(ApiCodes.NoAuth, (res: {message: string}) => {
            console.warn(`Failed to restore admin session "${res.message}"`)
            this.auth.auth = AuthType.NONE;
            this.auth.token = undefined;
        }).catch().send();
    }

    async restoreUserSession() {
    }

    async loginAdmin() {
        await this.post("auth/admin/login").then((res: {token: string, data: Admin}) => {
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

const remote = new ApiRemote(remoteURL);

// @ts-expect-error
window.APIREMOTE = remote;

export default remote;