import React from 'react'
import DashboardTemplate from '../templates/dashboardTemplate'
import useFetch from '../../hooks/useFetch'
const REGISTER_COURSE_URL = '/register-course'
import Filter from '../molecules/filter'


function CourseRegistration() {
  const registerCourses = useFetch(REGISTER_COURSE_URL)
  return (
    <DashboardTemplate>
      <main className=' bg-slate-200 md:w-4/5 p-5 h-[90vh] overflow-y-scroll'>
        {/* <div className="filter flex justify-between">
              <label htmlFor="department">
                Department: &nbsp;
                <select name="department" >
                  {
                    departments.map(dept=>{ 
                    return <option value={dept.departmentName}>{dept.departmentName}</option>
                    })
                  }
                </select>
              </label>
              <label htmlFor="department">
                Semester: &nbsp;
                <select name="semester" >
                  {
                    semester.map(semester=>{ 
                    return <option key={semester.id} value={semester.semester}>{semester.semester}</option>
                    })
                  }
                </select>
              </label>
              <label htmlFor="level">
                Level: &nbsp;
                <select name="level" >
                  {
                    level.map(level=>{ 
                    return <option key={level.id} value={level.level}>{level.level}</option>
                    })
                  }
                </select>
              </label>
              <label htmlFor="level">
                Period: &nbsp;
                <select name="level" >
                  {
                    period.map(period=>{ 
                    return <option value={period.period}>{period.period}</option>
                    })
                  }
                </select>
              </label>
              
        </div> */}
        <Filter/>
         <h1>Course registration</h1>
          {/* {
            registerCourses.map(item=> {
              return <p>{item.course.name}</p>
            })
          } */}
      </main>
    </DashboardTemplate>
  )
}

export default CourseRegistration