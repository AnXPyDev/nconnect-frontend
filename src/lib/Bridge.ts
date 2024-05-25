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