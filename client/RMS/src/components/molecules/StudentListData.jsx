import React from 'react'
import { useDispatch } from 'react-redux'
import { setStudentModalFalse, setStudentModalTrue } from '../../store/features/studentModalSlice'

function StudentListData() {
    const dispatch = useDispatch()
    const handler = ()=>{
         dispatch(setStudentModalTrue())    
    }
  return (
    <div className="studentList grid studentListContent">
            <div className="listData">22226</div>
            <div className="listData capitalize">ochuko</div>
            <div className="listData capitalize">george</div>
            <div className="listData">georgeochuko7@gmail.com</div>
            <div className="listData capitalize">Computer Science</div>
            <div className="listData capitalize" onClick={()=> handler()}>Edit</div>
        </div>
  )
}

export default StudentListData