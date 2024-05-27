import { remoteURL } from "@/config";

export function getResourceURL(id: number) {
    return `${remoteURL}resource/get?id=${id}`;
}