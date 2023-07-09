import React,{useState} from 'react'
import DashboardTemplate from '../templates/dashboardTemplate'
import StudentList from '../molecules/StudentList'
import Filter from '../molecules/Filter'
function Dashboard() {
  return (
    
    <DashboardTemplate>
        <main className=' bg-slate-200 md:w-4/5 p-5 h-[90vh] overflow-y-scroll'>
          {/* <Filter/> */}
          <StudentList/>
        </main>
    </DashboardTemplate>
  )
}

export default Dashboard