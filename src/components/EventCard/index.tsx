import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Text, Heading, Stack } from "@chakra-ui/react";
import { EventForReview } from "../../types/events";
import { Link } from "react-router-dom";
import { useRemoveSubscriptionMutation } from "../../services/redux/subscriptions/subscriptionsApiSlice";
import SubscribeButton from "../SubscribeButton";
import { useAppSelector } from "../../hooks/redux";
import { selectUserRole } from "../../services/redux/auth/authSlice";
import { useDeleteEventMutation } from "../../services/redux/events/eventsApiSlice";
import Carousel from "../Carousel";

interface EventCardProps {
    item: EventForReview;
}

export default function EventCard({ item }: EventCardProps) {
    const [leave] = useRemoveSubscriptionMutation();
    const [deleteEvent] = useDeleteEventMutation();
    const userRole = useAppSelector(selectUserRole);

    async function handleLeave() {
        try {
            await leave(item.id);
        }
        catch (err) {
            console.error(err);
        }
    }

    async function handleDelete() {
        try {
            await deleteEvent(item.id);
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <Card maxW='xl'>
                <CardBody>
                    <Carousel position="absolute" items={item.images}/>
                    <Stack mt='6' spacing='3'>
                        <Heading size='md'>{item.name}</Heading>
                        <Text color='blue.600' fontSize='xl'>
                            {item.freePlaces == 0 ? 'No free places' : `Free places: ${item.freePlaces}`}
                        </Text>
                    </Stack>
                    
                </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                <Button variant='outline' colorScheme='blue' as={Link} to={`/home/events/${item.id}`}>
                        View
                </Button>
                {userRole && userRole == 'User' ? (
                    item.isSubscribed ? (
                        <Button variant='ghost' colorScheme='blue' onClick={handleLeave}>
                            Leave
                        </Button>
                    ) : (
                        <SubscribeButton itemId={item.id}/>
                    )
                ) : (
                    <Button variant='solid' colorScheme='red' onClick={handleDelete}>
                        Delete
                    </Button>
                )}
                </ButtonGroup>
            </CardFooter>
    </Card>
    )
}