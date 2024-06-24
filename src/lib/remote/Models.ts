import { type Nullable } from '@/lib/util/Snippets';

export type ID = number;
export const InvalidID: ID = NaN;

export interface GenericModel {
    id?: ID
};

export type WithID<T extends GenericModel> = Omit<T, 'id'> & { id: ID };

export enum AdminPriv {
    VIEW, EDIT, SUPER
};

export interface Admin {
    id?: ID
    username: string
    priv: AdminPriv
    password?: string
}

export interface User {
    id?: ID
    name: string
    email: string
    timeslots?: number[]
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
    id?: ID
    name: string
    type: string
    metadata: M
    size: Nullable<number>
}

export type ImageMetadata = undefined;
export type Image = Resource<ImageMetadata>;

export interface Gallery {
    id?: ID
    name: string
    description: Nullable<string>
    public: boolean
    thumbnail_id: Nullable<ID>
}

export interface Stage {
    id?: ID
    name: string
}

export interface Company {
    name: string,
    link?: string
}

export interface Speaker {
    id?: ID
    name: string
    description: Nullable<string>
    subtitle: Nullable<string>
    company: Nullable<Company>
    contact: Contact
    image_id: Nullable<ID>
}

export interface Headliner {
    id?: ID;
    stage_id: ID;
    speaker_id: ID;
    stage?: Stage;
    speaker?: Speaker;
}

export interface Presentation {
    id?: ID
    name: string
    description: Nullable<string>
    long_description: Nullable<string>
    image_id: Nullable<ID>
    capacity: Nullable<number>
    allow_registration: boolean
    generic: boolean
    
    speaker_id: Nullable<ID>
    speaker?: Speaker
}

export interface Timeslot {
    id?: ID
    start_at: string
    end_at: string
    
    stage_id: ID
    stage?: Stage

    presentation_id: Nullable<ID>
    presentation?: Presentation
    
    remaining_capacity?: number
}


export interface Testimonial {
    id?: ID
    author: string
    description: string
    image_id: Nullable<ID>
}

export interface Sponsor {
    id?: number
    name: string
    description: Nullable<string>
    contact: Contact
    image_id: Nullable<ID>
}

export interface Organizer {
    id?: ID
    name: string
    role: string
    contact: Contact
    image_id: Nullable<ID>
}

export interface Qna {
    id?: ID
    question: string
    answer: string
};

export interface PageMetadata {
    slug: string,
    showHeader: boolean
}

export type Page = Resource<PageMetadata>;
