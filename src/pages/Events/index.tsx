import { useState } from "react";
import EventsList from "../../components/EventsList";
import { useGetAllEventsQuery } from "../../services/redux/events/eventsApiSlice";
import { useAppSelector } from "../../hooks/redux";
import { selectEventsQueryArguments } from "../../services/redux/events/eventsSlice";
import { PAGE_SIZE } from "../../constants";

export default function EventsPage() {
    const [page, setPage] = useState<number>(1);
    const queryArguments = useAppSelector(selectEventsQueryArguments);
    const {data, isLoading} = useGetAllEventsQuery({ pageNumber: page, pageSize: PAGE_SIZE, ...queryArguments });
    
    return (
        !isLoading && data && (
            <EventsList data={data} setPage={setPage}/>
        )
    )
}