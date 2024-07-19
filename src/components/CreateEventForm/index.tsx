import { Field, Form, Formik, FormikHelpers } from "formik";
import { Button, FormControl, FormErrorMessage, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Textarea } from "@chakra-ui/react";
import { CreateEventDTO } from "../../types/crudEvent";
import { createEventSchema } from "./validation";
import { useCreateEventMutation } from "../../services/redux/events/eventsApiSlice";
import React, { useState } from "react";

interface CreateEventFormProps {
    onClose: () => void;
}

export default function CreateEventForm({ onClose }: CreateEventFormProps) {
    const [createEvent] = useCreateEventMutation();
    const initialValues: CreateEventDTO = {
        name: '',
        description: '',
        adress: '',
        date: new Date().toISOString(),
        maxMemberCount: 10,
        categoryId: 1,
        images: null
    }
    const [filevar, setFilevar] = useState<FileList | null>(null);

    async function handleSubmit(values: CreateEventDTO, { setSubmitting }: FormikHelpers<CreateEventDTO>) {
        try {
            const formData: any = new FormData();
            formData.append('name', values.name!);
            formData.append('description', values.description!);
            formData.append('adress', values.adress!);
            formData.append('date', values.date);
            formData.append('maxMemberCount', values.maxMemberCount.toString());
            formData.append('categoryId', values.categoryId.toString());
            if (filevar) {
                for (let i = 0; i < filevar.length; i++) {
                    formData.append('images', filevar[i])
                }
            }
            await createEvent(formData);
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
        <Formik initialValues={initialValues} validationSchema={createEventSchema} onSubmit={handleSubmit}>
            {({ isSubmitting, isValid, errors, touched }) => (
                <Form>
                    <FormControl isInvalid={!!errors.name && touched.name}>
                        <FormLabel>Name</FormLabel>
                        <Field id='name' name='name' as={Input} type='text' />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.description && touched.description}>
                        <FormLabel>Description</FormLabel>
                        <Field id='description' name='description' as={Textarea} resize='none' type='text' />
                        <FormErrorMessage>{errors.description}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.adress && touched.adress}>
                        <FormLabel>Address</FormLabel>
                        <Field id='adress' name='adress' as={Input} type='text' />
                        <FormErrorMessage>{errors.adress}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.date && touched.date}>
                        <FormLabel>Date</FormLabel>
                        <Field id='date' name='date' as={Input} type='datetime-local' />
                        <FormErrorMessage>{errors.date}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.maxMemberCount && touched.maxMemberCount}>
                        <FormLabel>Max member count</FormLabel>
                        <Field id='maxMemberCount' name='maxMemberCount' >
                            {({ field }) => (
                                <NumberInput defaultValue={10} min={1} max={50}>
                                    <NumberInputField {...field} />
                                </NumberInput>
                            )}
                        </Field>
                        <FormErrorMessage>{errors.maxMemberCount}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.categoryId && touched.categoryId}>
                        <FormLabel>Category</FormLabel>
                        <Field id='categoryId' name='categoryId' as={Select} defaultChecked>
                            <option value={1}>Sport</option>
                            <option value={2}>Family</option>
                            <option value={3}>Education</option>
                            <option value={4}>Excursions</option>
                        </Field>
                        <FormErrorMessage>{errors.categoryId}</FormErrorMessage>
                    </FormControl>
                    <FormControl onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilevar(e.target.files)}>
                        <FormLabel>Images</FormLabel>
                        <Field id='images' name='images' as={Input} type='file' p={1} accept='image/png, image/jpeg' multiple/>
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
                    Create
                    </Button>
                </Form>
            )}
        </Formik>
    )
}