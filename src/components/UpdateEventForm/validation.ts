import * as yup from 'yup';

export const updateEventSchema = yup.object({
    name: yup.string().trim().required('Name is required'),
    description: yup.string().trim().min(10, 'Minimum 10 symbols')
        .max(200, 'Maximum 200 symbols').required('Description is required'),
    adress: yup.string().trim().required('Address is required'),
    date: yup.string().required('Date is required'),
    maxMemberCount: yup.number().min(1, 'At least one member should be')
        .max(50, 'Maximum 50 members').required('Max member count is required'),
    categoryId: yup.number().required('Category is required')
})