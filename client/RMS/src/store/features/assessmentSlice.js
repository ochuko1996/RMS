import { apiSlice } from "../api/apiSlice";

const assessmentSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAssessments: builder.query({
            query: ()=> "/assessment",
        }),
        addAssessment: builder.mutation({
            query: assessment => ({
                url: "/assessment",
                method: "POST",
                body: {...assessment}
            })
        }),
        updateAssessment: builder.mutation({
            query: assessment => ({
                url: `/assessment/${assessment._id}`,
                method: "PATCH",
                body: assessment
            })
        }),
        deleteAssessment: builder.mutation({
            query: ({id})=>({
                url: `/assessment/${id}`,
                method: 'DELETE',
                body: id
            })
        })
    })
})

export const {
    useAddAssessmentMutation,
    useDeleteAssessmentMutation,
    useGetAssessmentsQuery,
    useUpdateAssessmentMutation
} = assessmentSlice
