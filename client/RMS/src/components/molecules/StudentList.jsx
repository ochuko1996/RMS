import React from 'react'
import StudentListData from './StudentListData'
import useFetch from '../../hooks/useFetch'
const USER = "/user"
function StudentList() {
  const studentData = useFetch(USER) 
  return (
    <div className='relative'>
        <div className="studentListHeader studentList grid">
            <div className="listData capitalize">matriculation_no.</div>
            <div className="listData capitalize">first name</div>
            <div className="listData capitalize">last name</div>
            <div className="listData capitalize">email</div>
            <div className="listData capitalize">department</div>
            <div className="listData capitalize"></div>
        </div>
        {
            [...Array(50).keys()].map(i => <StudentListData key={i}/>)
            // studentData.map(student => <StudentListData key={student}/>)

        }
    </div>
    
  )
}

export default StudentList