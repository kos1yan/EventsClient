import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().trim().email('Invalid email format').required('Email is required'),
  password: yup.string().trim()
    .min(8, 'Password should be at least 8 chars') 
    .matches(/\d/, 'Password must contains only numbers')
    .required('Password required'),
});