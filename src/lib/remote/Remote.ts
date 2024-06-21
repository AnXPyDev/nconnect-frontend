import axios, { Axios } from "axios";
import { remoteURL } from "@/config";
import RequestBuilder from "./RequestBuilder";
import { tokenHeader } from "./Auth";

class Remote {
    baseURL: string;
    connection!: Axios;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        this.connection = axios.create({
            baseURL: this.baseURL
        });
        console.log("ApiRemote constructor");
    }

    private async postInternal(endpoint: string, data: object, headers_: object = tokenHeader()) {
        const headers = {
            Accept: "application/json",
            ...headers_
        }
        return (await this.connection.post(endpoint, data, { headers })).data;
    }

    private async putInternal(endpoint: string, query: string, data: unknown, headers_: object = tokenHeader()): Promise<any> {
        const headers = {
            Accept: "application/json",
            ...headers_
        }
        return (await this.connection.put(`${endpoint}?${query}`, data, { headers })).data;
    }

    private async getInternal(endpoint: string, query: string, headers_: object = tokenHeader()): Promise<any> {
        return await this.connection.get(`${endpoint}?${query}`, { headers: headers_ });
    }

    post(endpoint: string, data: object = {}, headers?: object): RequestBuilder {
        return new RequestBuilder(() => {
            return this.postInternal(endpoint, data, headers);
        }, endpoint);
    }

    put(endpoint: string, query: object = {}, data: unknown, headers?: object): RequestBuilder {
        return new RequestBuilder(() => {
            return this.putInternal(endpoint, new URLSearchParams(query as any).toString(), data, headers);
        });
    }

    get(endpoint: string, query: object = {}, headers?: object) {
        return new RequestBuilder(() => {
            return this.getInternal(endpoint, new URLSearchParams(query as any).toString(), headers);
        });
    }
}

const remote = new Remote(remoteURL);

export default remote;