import { ParsePaginationHeaders } from "../../../helpers/typeCasters";
import { Event, EventForReview, EventsQueryArgumentsWithPagination, EventsWithPagination } from "../../../types/events";
import { apiSlice } from "../api";

export const eventsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllEvents: builder.query<EventsWithPagination, EventsQueryArgumentsWithPagination>({
            query: ({ pageNumber, pageSize, searchByName = '', date = '', adress = '', category = '' }) => 
                `/events?PageSize=${pageSize}&PageNumber=${pageNumber}&SearchByName=${searchByName}&Date=${date}&Adress=${adress}&Category=${category}`,
            transformResponse: (response: EventForReview[], meta) => {
                const pagination = ParsePaginationHeaders(meta);

                return {
                    events: response,
                    pagination
                } as EventsWithPagination
            },
            providesTags: ['Event']
        }),
        getUserEvents: builder.query<EventsWithPagination, EventsQueryArgumentsWithPagination>({
            query: ({ pageNumber, pageSize, searchByName = '', date = '', adress = '', category = '' }) => 
                `/events/user?PageSize=${pageSize}&PageNumber=${pageNumber}&SearchByName=${searchByName}&Date=${date}&Adress=${adress}&Category=${category}`,
            transformResponse: (response: EventForReview[], meta) => {
                const pagination = ParsePaginationHeaders(meta);

                return {
                    events: response,
                    pagination
                } as EventsWithPagination
            },
            providesTags: ['Event']
        }),
        getEventById: builder.query<Event, string>({
            query: (id) => `/events/${id}`,
            providesTags: ['Event']
        }),
        createEvent: builder.mutation<Event, FormData>({
            query: (requestObj) => ({
                url: `/events`,
                method: 'POST',
                body: requestObj
            }),
            invalidatesTags: ['Event']
        }),
        updateEvent: builder.mutation<Event, FormData>({
            query: (requestObj) => ({
                url: `/events/${requestObj.get('id')?.toString()}`,
                method: 'PUT',
                body: requestObj
            }),
            invalidatesTags: ['Event']
        }),
        deleteEvent: builder.mutation<void, string>({
            query: (id) => ({
                url: `/events/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Event']
        })
    })
})

export const {
    useGetAllEventsQuery,
    useGetUserEventsQuery,
    useGetEventByIdQuery,
    useCreateEventMutation,
    useUpdateEventMutation,
    useDeleteEventMutation
} = eventsApiSlice