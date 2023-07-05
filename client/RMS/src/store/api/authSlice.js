import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        roles: null, 
        token: null, 
        firstName: null, 
    },
    reducers: {
        setCredentials: (state, action) => {
            const {roles, accessToken, firstName} = action.payload
            state.roles = roles
            state.token = accessToken
            state.firstName = firstName
        },
        logOut: (state, action)=> {
            state.roles = null
            state.token = null
            state.firstName = null
        }
    }
})

export const {setCredentials, logOut} = authSlice.actions

export default authSlice.reducer

export const selectCurrentRoles = (state)=> state.auth.roles
export const selectCurrentToken = (state)=> state.auth.token
export const selectCurrentFirstname = (state)=> state.auth.firstName