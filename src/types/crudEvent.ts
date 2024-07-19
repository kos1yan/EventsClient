import { Event } from "./events";

interface CreateEventDTO extends Omit<Event, 'id' | 'freePlaces' | 'category' | 'isSubscribed' | 'images'>  {
    categoryId: number,
    images: File | null
}

interface UpdateEventDTO extends Omit<CreateEventDTO, 'images'> {
    id: string;
    newImages: File | null,
    deletedImages: string[]
}

export type {
    CreateEventDTO,
    UpdateEventDTO
}