import { apiSlice } from "../api/apiSlice";

export const registeredCourseSlice = apiSlice.injectEndpoints({
    tagTypes: ["courses"],
    endpoints: builder => ({
        getRegisteredCourses: builder.query({
            query:()=> '/register-course',
            providesTags: ["courses"],
            transformResponse: res => res.sort((a,b)=> b._id.toString() - a._id.toString())


        }),
        getAllRegisteredCourses: builder.query({
            query:(params)=> `/register-course/admin?${params}`,
            providesTags: ["courses"],
            transformResponse: res => res.sort((a,b)=> b - a)

        }),
        addRegisterCourse: builder.mutation({
            query: course => ({
                url: '/register-course',
                method: 'POST',
                body: {...course}
            }),
            invalidatesTags: ["courses"]
        }),
        updateRegisterCourse: builder.mutation({
            query: course => ({
                url: `/register-course/${course.id}`,
                method: 'PATCH',
                body: course
            }),
            invalidatesTags: ["courses"]
        }),
        deleteRegisterCourse: builder.mutation({
            query: ({id}) => ({
                url: `/register-course/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["courses"]
        }),
    })
})

export const {
    useDeleteRegisterCourseMutation, 
    useGetRegisteredCoursesQuery, 
    useUpdateRegisterCourseMutation,
    useGetAllRegisteredCoursesQuery,
    useAddRegisterCourseMutation,
} = registeredCourseSlice
