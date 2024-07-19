import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";
import { Tokens } from "../../types/auth";
import { logout } from "./auth/authSlice";

const API_URL = import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const cookies = new Cookies();
        const token = cookies.get('AccessToken');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
})

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status == 401) {
        const cookies = new Cookies();
        const refreshToken = cookies.get('RefreshToken');

        const fetchArgs: FetchArgs = {
            url: '/token/refresh',
            method: 'POST',
            headers: {
                'Refresh-Token': refreshToken
            }
        };

        const refreshResult = await baseQuery(fetchArgs, api, extraOptions);

        if (refreshResult?.data) {
            const tokens = refreshResult.data as Tokens;
            cookies.set('AccessToken', tokens.accessToken);
            cookies.set('RefreshToken', tokens.refreshToken);

            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout())
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Event'],
    endpoints: () => ({})
})