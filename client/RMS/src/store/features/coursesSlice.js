import { apiSlice } from "../api/apiSlice";

const coursesSlice = apiSlice.injectEndpoints({
    tagTypes: ["courses"],
    endpoints: builder => ({
        getCourses: builder.query({
            query: ()=> "/courses",
            transformResponse: res => res.sort((a,b)=> a.name.localeCompare(b.name)),
            providesTags: ["courses"],
        }),
        addCourse: builder.mutation({
            query: course => ({
                url: "/courses",
                method: "POST",
                body: {...course}
            }),
            invalidatesTags: ["courses"]
        }),
        updateCourse: builder.mutation({
            query: course => ({
                url: `/courses/${course._id}`,
                method: "PATCH",
                body: course
            }),
            invalidatesTags: ["courses"]
        }),
        deleteCourse: builder.mutation({
            query: ({id}) => ({
                url: `/courses/${id}`,
                method: "DELETE",
                body: id
            }),
            invalidatesTags: ["courses"]
        })

    })
})


export const{
    useAddCourseMutation,
    useDeleteCourseMutation, 
    useGetCoursesQuery,
    useUpdateCourseMutation
} = coursesSlice