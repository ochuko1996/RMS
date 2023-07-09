import React from 'react'
import StudentListData from './StudentListData'

import { useGetUserQuery } from '../../store/features/userSlice'

function StudentList() {
  const {
    isLoading,
    data: studentData
  } = useGetUserQuery()
 
  return (
    <div className='relative'>
        <div className="studentListHeader studentList grid">
            <div className="listData capitalize">mat_no.</div>
            <div className="listData capitalize">first name</div>
            <div className="listData capitalize">last name</div>
            <div className="listData capitalize">email</div>
            <div className="listData capitalize">department</div>
            <div className="listData capitalize"></div>
        </div>
        {
            isLoading 
              ? 
              <h1>Loading...</h1>
              : 
              (
                // <h1>hello</h1>
                studentData.map(student => <StudentListData key={student._id} student={student}/>)
              )

        }
    </div>
    
  )
}

export default StudentList