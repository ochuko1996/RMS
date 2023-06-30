import React from 'react'
import { useDispatch } from 'react-redux'
import { setIsRegCourseModalTrue } from '../../store/features/regCourseDataSlice'

function StudentListData() {
    const dispatch = useDispatch()
    const handler = ()=>{
         dispatch(setIsRegCourseModalTrue())    
    }
  return (
    <div className="studentList grid studentListContent">
            <div className="listData">computer science</div>
            <div className="listData capitalize">ND 2</div>
            <div className="listData capitalize">4</div>
            <div className="listData">full time</div>
            <div className="listData capitalize" onClick={()=> handler()}>Edit</div>
        </div>
  )
}

export default StudentListData