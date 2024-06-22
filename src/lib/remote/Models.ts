export enum AdminPriv {
    VIEW, EDIT, SUPER
};

export interface Admin {
    id?: number
    username: string
    priv: AdminPriv
    password?: string
}

export interface User {
    id?: number
    name: string
    email: string
}

export enum ConferenceState {
    PREPARING, ONGOING
}

export type Contact = Record<string, string>;

export interface Conference {
    date: string,
    state: ConferenceState,

    subtitle: string,

    about_title: string,
    about_text: string,

    presentation_title: string,
    presentation_subtitle: string,

    location_name: string,
    location_city: string,
    location_full: string,
    location_link: string,
    location_map_embed: string,

    contact: Contact
}

export interface Resource<M = object> {
    id?: number
    name: string
    type: string
    metadata: M
    size?: number
}

export type ImageMetadata = undefined;
export type Image = Resource<ImageMetadata>;

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


export interface Company {
    name: string,
    link?: string
}

export interface Speaker {
    id?: number
    name: string
    description?: string
    subtitle?: string
    company?: Company
    contact: Contact
    image_id?: number
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
    capacity?: number
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

export interface Organizer {
    id?: number
    name: string
    role: string
    contact: Contact
    image_id?: number
}

export interface Qna {
    id?: number
    question: string
    answer: string
};

export interface PageMetadata {
    slug: string,
    showHeader: boolean
}

export type Page = Resource<PageMetadata>;