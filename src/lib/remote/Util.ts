import { remoteURL } from "@/config";
import defaultThumbnailURL from "@/assets/images/default-thumbnail.jpg";

export function getThumbnailURL(id?: number) {
    if (id === undefined) {
        return defaultThumbnailURL;
    }
    return getResourceURL(id);
}

export function getResourceURL(id?: number) {
    return `${remoteURL}resource/get?id=${id}`;
}