import React from 'react'
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux'
import { setStudentModalFalse, setStudentModalTrue } from '../../store/features/studentModalSlice'

function StudentListData({student}) {
  const studentDept = student?.department?.departmentName  
 
    const dispatch = useDispatch()
    const handler = ()=>{
         dispatch(setStudentModalTrue())    
    }
  return (
    <div className="studentList grid studentListContent">
            <div className="listData">{student.matricNo}</div>
            <div className="listData capitalize">{student.firstName}</div>
            <div className="listData capitalize">{student.lastName}</div>
            <div className="listData">{student.email}</div>
            <div className="listData capitalize">{ studentDept ? studentDept : "admin" }</div>
            <div className="listData capitalize" onClick={()=> handler()}>Edit</div>
        </div>
  )
}

export default StudentListData