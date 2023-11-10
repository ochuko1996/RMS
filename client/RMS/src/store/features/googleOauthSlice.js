import { apiSlice } from "../api/apiSlice";

export const googleOauthUrlSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getGoogleUrl: builder.query({
            query: ()=> '/auth/google/url'
        })
    })
})

export const {useGetGoogleUrlQuery} = googleOauthUrlSlice