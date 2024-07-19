import { Box, Container, FormControl, FormErrorMessage, FormLabel, Heading, Text, Link as ChakraUiLink, Button, Input } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { Field, Form, Formik, FormikHelpers } from "formik";
import { LoginDTO } from "../../types/user";
import { loginSchema } from "./validation";
import { useLoginMutation } from "../../services/redux/auth/authApiSlice";
import { useAppDispatch } from "../../hooks/redux";
import { setIsAuthorized } from "../../services/redux/auth/authSlice";

export default function LoginPage() {
    const [login] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const initialValues: LoginDTO = {
        email: '',
        password: ''
    }

    async function handleSubmit(values: LoginDTO, { setSubmitting }: FormikHelpers<LoginDTO>) {
        try {
            const tokens = await login(values).unwrap();
            dispatch(setIsAuthorized({ ...tokens }))
            navigate('/home', { replace: true });
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setSubmitting(false);
        }
    }

    return (
        <Container centerContent>
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Heading mb={10}>Login</Heading>
            </Box>
            <Formik initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
            >
                {({ isSubmitting, isValid, errors, touched }) => (
                    <Form style={{ width: 300 }}>
                        <FormControl isInvalid={!!errors.email && touched.email}>
                            <FormLabel>Email</FormLabel>
                            <Field id='email' name='email' as={Input} type='text' />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.password && touched.password}>
                            <FormLabel>Password</FormLabel>
                            <Field id='password' name='password' as={Input} type='password' />
                            <FormErrorMessage>{errors.password}</FormErrorMessage>
                        </FormControl>
                        <Text fontSize={14} mt={2}>
                            Dont&apos;t have an account?{' '}
                            <ChakraUiLink color='teal.500' as={ReactRouterLink} to='/register' replace>
                            Click here to sign up
                            </ChakraUiLink>
                        </Text>
                        <Button
                            mt={4}
                            width='100%'
                            bgColor='blue.200'
                            type='submit'
                            isDisabled={!isValid}
                            isLoading={isSubmitting}
                        >
                        Sign In
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}