import React,{useState} from 'react'
import DashboardTemplate from '../templates/dashboardTemplate'
import { coursesList } from '../../constants/courses'
import StudentList from '../molecules/StudentList'
// console.log(coursesList);
function Dashboard() {
  const [courses, setCourses] = useState(coursesList)
  return (
    
    <DashboardTemplate>
        <main className=' bg-slate-200 md:w-4/5 p-5 h-[90vh] overflow-y-scroll'>
            <StudentList/>
        </main>
    </DashboardTemplate>
  )
}

export default Dashboard