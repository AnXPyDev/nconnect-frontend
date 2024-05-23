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
    stage_id: number
    start_at: Date
    end_at: Date
}

export interface RawTimeslot {
    id?: number
    stage_id: number
    start_at: string
    end_at: string
}

export function parseTimeslot(ts: RawTimeslot): Timeslot {
    return {
        id: ts.id,
        stage_id: ts.stage_id,
        start_at: parseDateTime(ts.start_at),
        end_at: parseDateTime(ts.end_at)
    };
}

export function exportTimeslot(ts: Timeslot): RawTimeslot {
    return {
        id: ts.id,
        stage_id: ts.stage_id,
        start_at: exportDateTime(ts.start_at),
        end_at: exportDateTime(ts.end_at)
    };
}