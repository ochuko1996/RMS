import { configureStore } from "@reduxjs/toolkit";
import studentModalSlice from "./features/studentModalSlice";

const store = configureStore({
    reducer: {
        studentModal: studentModalSlice
    }
})

export default store