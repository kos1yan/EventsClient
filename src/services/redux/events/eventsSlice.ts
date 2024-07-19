import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventsQueryArguments } from "../../../types/events";
import { RootState } from "../store";

interface EventsState {
    queryArguments: EventsQueryArguments;
}

const initialState: EventsState = {
    queryArguments: {} as EventsQueryArguments
}

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setQueryArguments: (state, action: PayloadAction<EventsQueryArguments>) => {
            state.queryArguments = action.payload;
        }
    }
})

export const { setQueryArguments } = eventsSlice.actions;

export const selectEventsQueryArguments = (state: RootState) => state.events.queryArguments;

export default eventsSlice.reducer;