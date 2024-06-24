import { formatISO } from "date-fns";
import type { Nullable } from "../util/Snippets";
import { AdminPriv, InvalidID, type Admin, type Gallery, type Headliner, type ID, type Organizer, type Page, type Presentation, type Qna, type Speaker, type Sponsor, type Stage, type Testimonial, type Timeslot } from "./Models";

export const EmptyAdmin = (): Admin => ({
    username: "",
    priv: AdminPriv.VIEW,
    password: ""
});

export const EmptyGallery = (): Gallery => ({
    name: "",
    description: null,
    public: false,
    thumbnail_id: null
});

export const EmptyStage = (): Stage => ({
    name: ""
});

export const EmptySpeaker = (): Speaker => ({
    name: "",
    description: null,
    subtitle: null,
    company: null,
    contact: {},
    image_id: null
});

export const EmptyHeadliner = (): Headliner => ({
    stage_id: InvalidID,
    speaker_id: InvalidID
});
export const EmptyPresentation = (speaker_id: Nullable<ID> = null): Presentation => ({
    name: "",
    description: null,
    long_description: null,
    image_id: null,
    capacity: null,
    allow_registration: false,
    generic: false,
    speaker_id: null
});

export const EmptyTimeslot = (stage_id: ID): Timeslot => ({
    start_at: formatISO(Date.now()),
    end_at: formatISO(Date.now()),
    presentation_id: null,
    stage_id
});

export const EmptyTestimonial = (): Testimonial => ({
    author: "",
    description: "",
    image_id: null
});

export const EmptySponsor = (): Sponsor => ({
    name: "",
    description: null,
    contact: {},
    image_id: null
});

export const EmptyOrganizer = (): Organizer => ({
    name: "",
    role: "",
    contact: {},
    image_id: null
});

export const EmptyQna = (): Qna => ({
    question: "",
    answer: ""
});

export const EmptyPage = (): Page => ({
    name: "",
    metadata: {
        slug: "",
        showHeader: true
    },
    size: null,
    type: "page"
});