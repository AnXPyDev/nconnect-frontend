import { exportDateTime, parseDateTime } from "./Date"

export enum AuthType {
    NONE, USER, ADMIN
}

export interface Admin {
}

export interface User {
}

export interface Speaker {
    id?: number
    name: string
    description?: string
    image_id?: number
    socials?: object
}

export interface Stage {
    id?: number
    name: string
}

export interface Timeslot {
    id?: number
    presentation_id?: number
    stage_id: number
    start_at: string
    end_at: string
}

export interface Presentation {
    id?: number
    speaker_id: number
    name: string
    description?: string
    long_description?: string
}

export interface Testimonial {
    id?: number
    author: string
    description: string
    image_id?: number
}

export interface Resource {
    id?: number
    name: string
    type: string
    metadata?: object
    size?: number
}

export interface Gallery {
    id?: number
    thumbnail_id?: number
    name: string
    description?: string
}