import { remoteURL } from "@/config";
import defaultThumbnailURL from "@/assets/images/default-thumbnail.jpg";
import type { ID } from "./Models";
import type { Nullable } from "@/lib/util/Snippets";

export function getThumbnailURL(id?: Nullable<ID>) {
    if (id == undefined) {
        return defaultThumbnailURL;
    }
    return getResourceURL(id);
}

export function getResourceURL(id?: ID) {
    return `${remoteURL}/resource/get?id=${id}`;
}