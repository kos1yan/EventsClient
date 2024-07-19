import { SubscribeFormDTO } from "../../../types/subscribe";
import { apiSlice } from "../api";

export const subscriptionsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        subscribeToEvent: builder.mutation<void, SubscribeFormDTO>({
            query: (data) => ({
                url: `/members/event/${data.eventId}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Event']
        }),
        removeSubscription: builder.mutation<void, string>({
            query: (eventId) => ({
                url: `/members/event/${eventId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Event']
        })
    })
})

export const { useSubscribeToEventMutation, useRemoveSubscriptionMutation } = subscriptionsApiSlice;