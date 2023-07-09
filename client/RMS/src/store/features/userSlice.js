import { apiSlice } from "../api/apiSlice";

export const userSlice = apiSlice.injectEndpoints({
    tagTypes: ["user"],
    endpoints: builder => ({
        getUser: builder.query({
            query:()=> "/user",
            providesTags: ["user"]
        }),
        addUser: builder.mutation({
            query: user => ({
                url: "/user",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["user"]
        }),
        deleteUser: builder.mutation({
            query: ({id})=> ({
                url: `/user/${id}`,
                method: "DELETE",
                body: id

            }),
            invalidatesTags: ["user"]
        }),
        updateUser: builder.mutation({
            query: (user)=> ({
                url: `/user/${user._id}`,
                method: "DELETE",
                body: id
            }),
            invalidatesTags: ["user"]
        })
    })
})

export const {useAddUserMutation, useDeleteUserMutation, useUpdateUserMutation, useGetUserQuery} = userSlice