import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api";
import eventsSlice from "./events/eventsSlice";
import authSlice from "./auth/authSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        events: eventsSlice,
        auth: authSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch