import type { Resource } from "../Bridge";

export interface ImagePickerRequest {
    allowNone: boolean,
}

export interface ImagePickerResult {
    image?: Resource
}