export enum AuthType {
    NONE, USER, ADMIN
}

export interface Admin {
}

export interface User {
}

export interface Speaker {
    id?: number,
    name: string,
    description?: string
}

export interface Stage {
    id?: number,
    name: string
}