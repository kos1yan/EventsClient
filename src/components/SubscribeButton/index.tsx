import { Button } from "@chakra-ui/react";
import CustomModal from "../CustomModal";
import SubscribeForm from "../SubscribeForm";

interface SubscribeButtonProps {
    itemId: string;
}

export default function SubscribeButton({ itemId }: SubscribeButtonProps) {
    return (
        <CustomModal 
            headerText="Subscribe to event" 
            triggerButton={({ onOpen }) => (
                <Button variant='solid' colorScheme='blue' onClick={onOpen}>
                    Subscribe
                </Button>
            )}
            renderComponent={({ onClose }) => (
                <SubscribeForm eventId={itemId} onClose={onClose}/>
            )}
        />
    )
}