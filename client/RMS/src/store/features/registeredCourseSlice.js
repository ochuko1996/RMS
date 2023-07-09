import { apiSlice } from "../api/apiSlice";

export const registeredCourseSlice = apiSlice.injectEndpoints({
    tagTypes: ["courses"],
    endpoints: builder => ({
        getRegisteredCourses: builder.query({
            query:()=> '/register-course',
            providesTags: ["courses"]

        }),
        getAllRegisteredCourses: builder.query({
            query:(params)=> `/register-course/admin?${params}`,
            providesTags: ["courses"]
        }),
        addRegisterCourse: builder.mutation({
            query: course => ({
                url: '/register-course',
                method: 'POST',
                body: course
            }),
            invalidatesTags: ["courses"]
        }),
        updateRegisterCourse: builder.mutation({
            query: course => ({
                url: `/register-course/course._id`,
                method: 'PATCH',
                body: course
            }),
            invalidatesTags: ["courses"]
        }),
        deleteRegisterCourse: builder.mutation({
            query: ({id}) => ({
                url: `/register-course/id`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ["courses"]
        }),
    })
})

export const {
    useAddRegisterCourseMutation, 
    useDeleteRegisterCourseMutation, 
    useGetRegisteredCoursesQuery, 
    useUpdateRegisterCourseMutation,
    useGetAllRegisteredCoursesQuery,
} = registeredCourseSlice
