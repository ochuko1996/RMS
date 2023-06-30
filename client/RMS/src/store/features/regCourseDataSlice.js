import { createSlice } from "@reduxjs/toolkit";

const regCourseModalSlice = createSlice({
    name: "regCourseModal",
    initialState: {
        isRegCourseModal: false
    },
    reducers:{
        setIsRegCourseModalTrue(){
            state.isRegCourseModal = true
        },
        setIsRegCourseModalFalse(){
            state.isRegCourseModal = false
        }
    }
})

export const {setIsRegCourseModalFalse, setIsRegCourseModalTrue} = regCourseModalSlice.actions
export default regCourseModalSlice.reducer