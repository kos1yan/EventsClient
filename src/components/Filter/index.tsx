import { Button, Heading, Input, Select, VStack } from "@chakra-ui/react";
import Search from "../Search";
import { useState } from "react";
import { EventsQueryArguments } from "../../types/events";
import { useAppDispatch } from "../../hooks/redux";
import { setQueryArguments } from "../../services/redux/events/eventsSlice";

export default function Filter() {
    const [searchByNameValue, setSearchByNameValue] = useState<string>('');
    const [searchByAddressValue, setSearchByAddressValue] = useState<string>('');
    const [searchByDateTimeValue, setSearchByDateTimeValue] = useState<string>('');
    const [searchByCategoryValue, setSearchByCategoryValue] = useState<number | undefined>(undefined);
    const dispatch = useAppDispatch();

    function handleSearchByName(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchByNameValue(event.target.value);
    }

    function handleSearchByAddress(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchByAddressValue(event.target.value);
    }
    
    function handleSearchByDateTime(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchByDateTimeValue(event.target.value);
    }

    function handleSearchByCategory(event: React.ChangeEvent<HTMLSelectElement>) {
        if (!event.target.value) {
            setSearchByCategoryValue(undefined);
        }
        else {
            setSearchByCategoryValue(Number(event.target.value));
        }
        
    }

    function handleSubmit() {
        const payload: EventsQueryArguments = {
            searchByName: searchByNameValue,
            adress: searchByAddressValue,
            date: searchByDateTimeValue,
            category: searchByCategoryValue
        };

        dispatch(setQueryArguments(payload));
    }

    return (
        <VStack spacing={5} align='end'>
            <Heading alignSelf='start'>Filter</Heading>
            <Search placeholder='Search by name...' value={searchByNameValue} onChange={handleSearchByName}/>
            <Input placeholder='Select Date and Time' size='md' type='datetime-local' onChange={handleSearchByDateTime}/>
            <Search placeholder='Search by address...' value={searchByAddressValue} onChange={handleSearchByAddress}/>
            <Select placeholder='Select option' onChange={handleSearchByCategory}>
                <option value={1}>Sport</option>
                <option value={2}>Family</option>
                <option value={3}>Education</option>
                <option value={4}>Excursions</option>
            </Select> 
            <Button mt={5} onClick={handleSubmit}>Filter</Button>  
        </VStack>
    )
}