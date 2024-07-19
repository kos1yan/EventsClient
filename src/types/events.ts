import { Category } from "./category";
import { Pagination, QueryArgumentsPagination } from "./pagination";

type Image = {
    url: string;
}

type Event = {
    id: string;
    name?: string;
    description?: string;
    adress?: string;
    date: string;
    freePlaces: number;
    category: Category;
    isSubscribed: boolean;
    maxMemberCount: number;
    images: Image[];
}

type EventForReview = Omit<Event, 'description' | 'adress' | 'date' | 'category'>;

type EventsWithPagination = {
    events: EventForReview[];
    pagination: Pagination;
}

interface EventsQueryArguments {
    searchByName?: string;
    date?: string;
    adress?: string;
    category?: number;
}

interface EventsQueryArgumentsWithPagination extends QueryArgumentsPagination, EventsQueryArguments {}

export type {
    Image,
    Event,
    EventForReview,
    EventsWithPagination,
    EventsQueryArguments,
    EventsQueryArgumentsWithPagination
}