import { apiSlice } from "../api/apiSlice";

const resultSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSingleResult: builder.query({
            query: ()=> "/result/single"
        }),
        getAllResult: builder.query({
            query: ()=> "/result"
        }),
    })
})

export const {
    useGetAllResultQuery,
    useGetSingleResultQuery
} = resultSlice