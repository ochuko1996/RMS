import React from 'react'
import DashboardTemplate from '../templates/dashboardTemplate'
import Input from '../atom/Input'
import useFetch from '../../hooks/useFetch'
const COURSES_URL = '/courses'
function Courses() {
  const courses = useFetch(COURSES_URL)
  console.log(courses);
  return (
    <DashboardTemplate>
         <main className=' bg-slate-200 md:w-4/5 p-5 h-[90vh] overflow-y-scroll'>
             <div className="filter">
              <Input type="checkbox" name="department">
                Department: &nbsp;
              </Input>
             </div>
        </main>
    </DashboardTemplate>
  )
}

export default Courses