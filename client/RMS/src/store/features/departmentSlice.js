import { apiSlice } from "../api/apiSlice";

export const departmentSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDepartment: builder.query({
            query: ()=> '/department',
        })
    })
})

export const {
    useGetDepartmentQuery
} = departmentSlice