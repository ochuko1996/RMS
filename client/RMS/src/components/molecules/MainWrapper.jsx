import React from 'react'
import DashboardTemplate from '../templates/dashboardTemplate'

function MainWrapper({children}) {
  return (
    <DashboardTemplate>
        <main className=' bg-slate-200 md:w-4/5 p-5 h-[90vh] overflow-y-scroll'>
            {children}
        </main>
    </DashboardTemplate>
  )
}

export default MainWrapper