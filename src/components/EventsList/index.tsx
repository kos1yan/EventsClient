import { Box, Center, HStack, SimpleGrid } from "@chakra-ui/react";
import { EventsWithPagination } from "../../types/events";
import EventCard from "../EventCard";
import ReactPaginate from "react-paginate";
import { Dispatch, SetStateAction } from "react";
import './styles.css';
import Filter from "../Filter";

interface EventsListProps {
    data: EventsWithPagination;
    setPage: Dispatch<SetStateAction<number>>;
}

export default function EventsList({ data, setPage }: EventsListProps) {    
    function handlePageClick(event: { selected: number }) {
        setPage(event.selected + 1);
    }

    return (
        <>
            <HStack align='start' mx={10} spacing={30}>
                <Filter />
                <Box flex={1}>
                    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
                        {
                            data.events.map(event => (
                                <EventCard key={event.id} item={event}/>
                            ))
                        }
                    </SimpleGrid>
                    <Center>
                        <ReactPaginate 
                            breakLabel='...'
                            nextLabel='Next'
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            pageCount={data.pagination.TotalPages}
                            previousLabel="Previous"
                            renderOnZeroPageCount={null}
                            nextLinkClassName="pagination-next-link"
                            containerClassName="pagination-container"
                            activeLinkClassName="pagination-page-active"
                            pageLinkClassName="pagination-page-link"
                            previousLinkClassName="pagination-previous-link"
                        />
                    </Center>
                </Box>
            </HStack>
        </>
    )
}