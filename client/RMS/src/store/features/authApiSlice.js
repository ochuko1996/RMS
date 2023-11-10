import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: {...credentials}
            })
        }),
        signup: builder.mutation({
            query: credentials =>({
                url: '/auth/register',
                method: 'POST',
                body: {...credentials}
            })
        }),
        logout: builder.mutation({
            query: ()=> ({
                url: '/logout',
                method: "POST"
            })
        })
    })
})

export const {
    useLoginMutation,
    useSignupMutation,
    useLogoutMutation
} = authApiSlice