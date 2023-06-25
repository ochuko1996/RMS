import { createSlice } from "@reduxjs/toolkit";

export const studentModalSlice = createSlice({
    name: 'studentModal',
    initialState: {studentModal: false},
    reducers:{
        setStudentModalTrue(state, action){
            state.studentModal = true
        },
        setStudentModalFalse(state, action){
            state.studentModal = false
        },
    }
})

export const {setStudentModalFalse, setStudentModalTrue} = studentModalSlice.actions
export default studentModalSlice.reducer