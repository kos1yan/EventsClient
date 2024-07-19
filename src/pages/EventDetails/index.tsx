import { useParams } from "react-router-dom";
import { useGetEventByIdQuery } from "../../services/redux/events/eventsApiSlice";
import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import SubscribeButton from "../../components/SubscribeButton";
import { useAppSelector } from "../../hooks/redux";
import { selectUserRole } from "../../services/redux/auth/authSlice";
import CustomModal from "../../components/CustomModal";
import UpdateEventForm from "../../components/UpdateEventForm";
import Carousel from "../../components/Carousel";
import { useRemoveSubscriptionMutation } from "../../services/redux/subscriptions/subscriptionsApiSlice";

export default function EventDetailsPage() {
    const { id } = useParams();
    const { data, isLoading } = useGetEventByIdQuery(id!);
    const userRole = useAppSelector(selectUserRole);
    const [leave] = useRemoveSubscriptionMutation();

    async function handleLeave() {
        try {
            await leave(id!);
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        !isLoading && data && (
            <Box ml='20%'>
                <HStack align='start' spacing={20} >
                    <Flex flex={1} mr={100}>
                        <Carousel position="relative" items={data.images}/>
                    </Flex>
                    <VStack align='start' flex={1} spacing={50}>
                        <VStack align='start'>
                            <Text fontSize='5xl'>{data.name}</Text>
                            <Text fontSize='lg' color='gray'>{new Date(data.date).toLocaleString()}</Text>
                            <Text fontSize='lg'>{data.adress}</Text>
                            <Text fontSize='lg'>Category: {data.category.name}</Text>
                            <Text color='blue.600' fontSize='xl'>
                                {data.freePlaces == 0 ? 'No free places' : `Free places: ${data.freePlaces}`}
                            </Text>
                        </VStack>
                       <HStack>
                       {userRole && userRole == 'User' ? (
                            data.isSubscribed ? (
                                <Button variant='ghost' colorScheme='blue' onClick={handleLeave}>
                                    Leave
                                </Button>
                            ) : (
                                <SubscribeButton itemId={data.id} />
                            )
                       ) : (
                            <CustomModal
                                headerText="Update event"
                                triggerButton={({ onOpen }) => (
                                    <Button variant='solid' colorScheme='blue' onClick={onOpen}>
                                        Update
                                    </Button>
                                )} 
                                renderComponent={({ onClose }) => (
                                    <UpdateEventForm item={data} onClose={onClose}/>
                                )}
                            />
                       )} 
                        </HStack>             
                    </VStack>
                </HStack>
                <Text mt={10}>{data.description}</Text>
            </Box>
            
        )
    )
}