import React from 'react'
import DashboardTemplate from '../templates/dashboardTemplate'
import Input from '../atom/Input'
import { useGetCoursesQuery } from '../../store/features/coursesSlice';
import AddCourses from '../molecules/AddCourses';
import AllCourses from '../molecules/AllCourses';
function Courses() {
  const {data:courses, isLoading} =useGetCoursesQuery()
  return (
    <DashboardTemplate>
         <main className=' bg-slate-200 md:w-4/5 p-5 h-[90vh] overflow-y-scroll'>
             <AddCourses/>
             {
              isLoading 
                ? <h1>loading...</h1>
                : (
                  courses.map(course=> <AllCourses key={course._id} course={course}/>)
                )
             }
        </main>
    </DashboardTemplate>
  )
}

export default Courses