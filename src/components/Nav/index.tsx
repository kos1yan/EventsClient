import { Button, HStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { logout, selectUserRole } from "../../services/redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import CustomModal from "../CustomModal";
import CreateEventForm from "../CreateEventForm";

export default function Nav() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userRole = useAppSelector(selectUserRole);

    function handleLogout() {
        dispatch(logout());
        navigate('/')
    }   

    return (
        <HStack p={4} bgColor='gray.300' as='nav' justify='space-between'>
           <HStack>
            {userRole && userRole == 'User' ? (
                <>
                    <Button as={Link} to='/home'>Events</Button>
                    <Button as={Link} to='/home/myEvents'>My Events</Button>
                </>
            ) : (
                <>
                    <Button as={Link} to='/home'>Events</Button>
                    <CustomModal
                        headerText="Create event"
                        triggerButton={({ onOpen }) => (
                            <Button onClick={onOpen}>Create event</Button>
                        )}
                        renderComponent={({ onClose }) => (
                            <CreateEventForm onClose={onClose} />
                        )}
                    />
                </>
            )}
           </HStack>
           <HStack>
            <Button onClick={handleLogout}>Logout</Button>
           </HStack>
        </HStack>
    )
}