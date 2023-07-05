import { configureStore } from "@reduxjs/toolkit";
import studentModalSlice from "./features/studentModalSlice";
import { apiSlice } from "./api/apiSlice";
import authReducer from './api/authSlice'

const store = configureStore({
    reducer: {
        studentModal: studentModalSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store