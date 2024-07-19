import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../Nav";
import { Container } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppSelector } from "../../hooks/redux";
import { selectIsAuthorized } from "../../services/redux/auth/authSlice";

export default function Layout() {
    const navigate = useNavigate();
    const isAuthorized = useAppSelector(selectIsAuthorized);

    useEffect(() => {
        if (!isAuthorized) {
        navigate('/');
       }
    }, [])

    return (
        <>
            <Nav /> 
            <Container maxW='100%' mt={10}>
                <Outlet />
            </Container>
        </>
    )
}