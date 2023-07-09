import React from 'react'
import RegStudentData from './RegStudentData'
import useFetch from '../../hooks/useFetch'
const REGISTERED_COURSES_URL = '/register-course'
function RegisteredCourses() {

  return (
    <div className='relative'>
        <div className="studentListHeader studentList grid">
            <div className="listData capitalize">Course</div>
            <div className="listData capitalize">Level</div>
            <div className="listData capitalize">Semester</div>
            <div className="listData capitalize">Period</div>
            <div className="listData capitalize"></div>
        </div>
        {
            [...Array(50).keys()].map(i => <RegStudentData key={i}/>)
            // registerCourseData.map(student => <RegStudentData key={student}/>)

        }
    </div>
  )
}

export default RegisteredCourses