import React,{useState} from 'react'
import DashboardTemplate from '../templates/dashboardTemplate'
import { coursesList } from '../../constants/courses'
import StudentList from '../molecules/StudentList'
import RegisteredCourses from '../molecules/RegisteredCourses'
// console.log(coursesList);
function Dashboard() {
  const [courses, setCourses] = useState(coursesList)
  const [content, setContent] = useState(false)
  const [showContent, setShowContent] = useState(0)
  return (
    
    <DashboardTemplate>
        <main className=' bg-slate-200 md:w-4/5 p-5 h-[90vh] overflow-y-scroll'>
            {content && <StudentList/>}
            {content && <h1>hello</h1>}
            {content && <h1>blue</h1>}
            {content && <h1>hello world</h1>}
            {content && <h1>sustain</h1>}
            {/* <RegisteredCourses/> */}
        </main>
    </DashboardTemplate>
  )
}

export default Dashboard