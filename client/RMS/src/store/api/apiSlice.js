import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

import {setCredentials, logOut} from './authSlice'
// import { useDispatch } from "react-redux"
const baseQuery = fetchBaseQuery({
    // baseUrl: 'https://resultmanagementsystem-3cg8.onrender.com/api',
    baseUrl: 'http://localhost:4500/api',
    credentials: "include",
    prepareHeaders: (headers, {getState})=>{
        const token = getState().auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    // const dispatch = useDispatch()
    console.log(result);
    if(result?.error?.originalStatus === 403){
        console.log("sending refresh token");
        //  send refresh token to get new access token 
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult);
        if (refreshResult?.data){
            const roles = api.getState().auth.roles
            const firstName = api.getState().auth.firstName
            //store the new token
            api.dispatch(setCredentials({...refreshResult.data, firstName, roles}))
            // retry the original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})