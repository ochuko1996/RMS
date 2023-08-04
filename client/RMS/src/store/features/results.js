import { apiSlice } from "../api/apiSlice";

const resultSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSingleResult: builder.query({
            query: ()=> "/result/single"
        }),
        getAllResult: builder.query({
            query: (searchQuery)=> `/result?${searchQuery}`
            // query: ()=> `/result?search=2343`
        }),
    })
})

export const {
    useGetAllResultQuery,
    useGetSingleResultQuery
} = resultSlice