import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import EventsPage from '../pages/Events';
import MyEventsPage from '../pages/MyEvents';
import EventDetailsPage from '../pages/EventDetails';


export const router = createBrowserRouter([
    {
        path: '/home',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <EventsPage />
            },
            {
                path: 'myEvents',
                element: <MyEventsPage />
            },
            {
                path: 'events/:id',
                element: <EventDetailsPage />
            }
        ]

    },
    {
        path: '/',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    }
])