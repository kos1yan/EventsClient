import { Field, Form, Formik, FormikHelpers} from "formik";
import { Button, Checkbox, FormControl, FormErrorMessage, FormLabel, Image as ChakraImage, Input,NumberInput, NumberInputField, Select, Textarea } from "@chakra-ui/react";
import { UpdateEventDTO } from "../../types/crudEvent";
import { Event } from "../../types/events";
import { updateEventSchema } from "./validation";
import { useUpdateEventMutation } from "../../services/redux/events/eventsApiSlice";
import { useState } from "react";

interface UpdateEventFormProps {
    onClose: () => void;
    item: Event
}

export default function UpdateEventForm({ onClose, item }: UpdateEventFormProps) {
    const [updateEvent] = useUpdateEventMutation();
    const initialValues: UpdateEventDTO = {
        id: item.id,
        name: item.name,
        description: item.description,
        adress: item.adress,
        date: item.date,
        maxMemberCount: item.maxMemberCount,
        categoryId: Number(item.category.id),
        newImages: null,
        deletedImages: []
    }
    const [filevar, setFilevar] = useState<FileList | null>(null);
    const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

    function handleAddImageToDelete(url: string) {
        if (imagesToDelete.find((item) => item == url)) {
            setImagesToDelete(imagesToDelete.filter(item => item !== url))
        }
        else {
            setImagesToDelete([...imagesToDelete, url])
        }
    }

    async function handleSubmit(values: UpdateEventDTO, { setSubmitting }: FormikHelpers<UpdateEventDTO>) {
        try {
            const formData: any = new FormData();
            formData.append('id', values.id);
            formData.append('name', values.name!);
            formData.append('description', values.description!);
            formData.append('adress', values.adress!);
            formData.append('date', values.date);
            formData.append('maxMemberCount', values.maxMemberCount.toString());
            formData.append('categoryId', values.categoryId.toString());
            if (filevar) {
                for (let i = 0; i < filevar.length; i++) {
                    formData.append('newImages', filevar[i])
                }
            }
            if (imagesToDelete) {
                for (let i = 0; i < imagesToDelete.length; i++) {
                    formData.append('deletedImages', imagesToDelete[i]);
                }
            }
            await updateEvent(formData);
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
        <Formik initialValues={initialValues} validationSchema={updateEventSchema} onSubmit={handleSubmit}>
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
                                <NumberInput defaultValue={item.maxMemberCount} min={1} max={10000}>
                                    <NumberInputField {...field}/>
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
                    {item.images.length !== 0 && (
                        <FormControl>
                            <FormLabel>Delete images</FormLabel>
                            {item.images.map((item, index) => (
                                    <Checkbox key={index} onChange={() => handleAddImageToDelete(item.url!)}>
                                        <ChakraImage src={item.url}/>
                                    </Checkbox>
                            ))}
                            <FormErrorMessage>{errors.categoryId}</FormErrorMessage>
                        </FormControl>
                    )}
                    <Button
                        mt={4}
                        mb={4}
                        width='100%'
                        bgColor='blue.200'
                        type='submit'
                        isDisabled={!isValid}
                        isLoading={isSubmitting}
                    >
                    Update
                    </Button>
                </Form>
            )}
        </Formik>
    )
}