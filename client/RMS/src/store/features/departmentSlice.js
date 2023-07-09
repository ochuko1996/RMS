import { apiSlice } from "../api/apiSlice";

export const departmentSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDepartment: builder.query({
            query: ()=> '/department',
        }),
        addDepartment: builder.mutation({
            query: (department) => ({
                url: '/department',
                method: 'POST',
                body: department
            })
        }),
        updateDepartment: builder.mutation({
            query: (department) => ({
                url: `/department/${department._id}`
            })
        }),
        deleteDepartment: builder.mutation({
            query: ({id})=> ({
                url:  `/department/${id}`,
                method: 'DELETE',
                body: id
            })
        })
    })
})

export const {
    useGetDepartmentQuery,
    useAddDepartmentMutation,
    useDeleteDepartmentMutation,
    useUpdateDepartmentMutation,
    useLazyGetDepartmentQuery
} = departmentSlice