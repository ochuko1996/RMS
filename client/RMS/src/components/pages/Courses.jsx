import React from 'react'
import DashboardTemplate from '../templates/dashboardTemplate'
import Input from '../atom/Input'
function Courses() {
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