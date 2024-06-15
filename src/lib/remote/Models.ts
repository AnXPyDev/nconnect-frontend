export enum AuthType {
    NONE, USER, ADMIN
}

export interface Admin {
}

export interface User {
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
    public: boolean
}

export interface Stage {
    id?: number
    name: string
}

export interface SpeakerMetadata {
    company?: {
        name: string
        link?: string
    }
    contact?: { [key: string]: string }
    subtitle?: string
}

export interface Speaker {
    id?: number
    name: string
    description?: string
    image_id?: number
    metadata: SpeakerMetadata
}

export interface Headliner {
    id?: number;
    stage_id: number | null;
    speaker_id: number | null;
    stage?: Stage;
    speaker?: Speaker;
}

export interface Presentation {
    id?: number
    speaker_id?: number
    speaker?: Speaker
    name: string
    description?: string
    long_description?: string
    image_id?: number
}

export interface Timeslot {
    id?: number
    presentation_id?: number
    presentation?: Presentation
    stage_id: number
    start_at: string
    end_at: string
}


export interface Testimonial {
    id?: number
    author: string
    description: string
    image_id?: number
}

export interface Sponsor {
    id?: number
    name: string
    description?: string
    contact: Contact
    image_id?: number
}