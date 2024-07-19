import { Tokens } from "../../../types/auth";
import { LoginDTO, RegisterDTO } from "../../../types/user";
import { apiSlice } from "../api";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<Tokens, LoginDTO>({
            query: (credentials) => ({
                url: '/authentication/login',
                method: 'POST',
                body: {...credentials}
            })
        }),
        register: builder.mutation<Tokens, RegisterDTO>({
            query: (credentials) => ({
                url: '/authentication',
                method: 'POST',
                body: {...credentials}
            })
        }),
        tokensRefresh: builder.mutation<Tokens, string>({
            query: (refreshToken) => ({
              url: '/token/refresh',
              method: 'POST',
              headers: {
                'Refresh-Token': refreshToken,
              },
            }),
        }),
    })
})

export const { useLoginMutation, useRegisterMutation, useTokensRefreshMutation } = authApiSlice;