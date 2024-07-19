import * as yup from 'yup';

export const subscribeSchema = yup.object({
    name: yup.string().trim().required('Name is required'),
    surname: yup.string().trim().required('Surname is required'),
    dateOfBirth: yup.string().trim().required('Date of birth is required'),
    email: yup.string().trim().email().required('Email is required')
})