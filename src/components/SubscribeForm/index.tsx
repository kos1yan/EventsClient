import { Field, Form, Formik, FormikHelpers } from "formik";
import { SubscribeFormDTO } from "../../types/subscribe";
import { subscribeSchema } from "./validation";
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useSubscribeToEventMutation } from "../../services/redux/subscriptions/subscriptionsApiSlice";

interface SubscribeFormProps {
    onClose: () => void;
    eventId: string;
}

export default function SubscribeForm({ onClose, eventId }: SubscribeFormProps) {
    const [subscribeToEvent] = useSubscribeToEventMutation();

    const initialValues: SubscribeFormDTO = {
        eventId,
        name: '',
        surname: '',
        dateOfBirth: '',
        email: ''
    }

    async function handleSubmit(values: SubscribeFormDTO, { setSubmitting }: FormikHelpers<SubscribeFormDTO>) {
        try {
            await subscribeToEvent(values);
            onClose();
        }
        catch (err) {
            console.error(err)
        }
        finally {
            setSubmitting(false);
        }
    }

    return (
        <Formik initialValues={initialValues} validationSchema={subscribeSchema} onSubmit={handleSubmit}>
            {({ isSubmitting, isValid, errors, touched }) => (
                <Form>
                    <FormControl isInvalid={!!errors.name && touched.name}>
                        <FormLabel>Name</FormLabel>
                        <Field id='name' name='name' as={Input} type='text' />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.surname && touched.surname}>
                        <FormLabel>Surname</FormLabel>
                        <Field id='surname' name='surname' as={Input} type='text' />
                        <FormErrorMessage>{errors.surname}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.dateOfBirth && touched.dateOfBirth}>
                        <FormLabel>Date of birth</FormLabel>
                        <Field id='dateOfBirth' name='dateOfBirth' as={Input} type='date' />
                        <FormErrorMessage>{errors.dateOfBirth}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.email && touched.email}>
                        <FormLabel>Email</FormLabel>
                        <Field id='email' name='email' as={Input} type='text' />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    <Button
                        mt={4}
                        mb={4}
                        width='100%'
                        bgColor='blue.200'
                        type='submit'
                        isDisabled={!isValid}
                        isLoading={isSubmitting}
                    >
                    Subscribe
                    </Button>
                </Form>
            )}
        </Formik>
    )
}