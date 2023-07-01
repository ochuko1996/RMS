import React from 'react'
import DashboardTemplate from '../templates/dashboardTemplate'
import useFetch from '../../hooks/useFetch'
import Input from '../atom/Input'
const REGISTER_COURSE_URL = '/register-course'
const DEPARTMENT_URL = '/department'
function CourseRegistration() {
  // const registerCourses = useFetch(REGISTER_COURSE_URL)
  const departments = useFetch(DEPARTMENT_URL)
  console.log(departments);
  return (
    <DashboardTemplate>
      <main className=' bg-slate-200 md:w-4/5 p-5 h-[90vh] overflow-y-scroll'>
        <div className="filter flex justify-between">
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
                <select name="department" >
                  {
                    departments.map(dept=>{ 
                    return <option value={dept.departmentName}>{dept.departmentName}</option>
                    })
                  }
                </select>
              </label>
              <label htmlFor="department">
                Level: &nbsp;
                <select name="department" >
                  {
                    departments.map(dept=>{ 
                    return <option value={dept.departmentName}>{dept.departmentName}</option>
                    })
                  }
                </select>
              </label>
              <label htmlFor="department">
                Period: &nbsp;
                <select name="department" >
                  {
                    departments.map(dept=>{ 
                    return <option value={dept.departmentName}>{dept.departmentName}</option>
                    })
                  }
                </select>
              </label>
              
        </div>
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