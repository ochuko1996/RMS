import React from 'react'
import DashboardTemplate from '../templates/dashboardTemplate'

function HomePage() {
  return (
    <DashboardTemplate>
        <main className=' bg-slate-200 md:w-4/5 p-5 h-[90vh] overflow-y-scroll'>
             <h1>Home</h1>
        </main>
    </DashboardTemplate>
  )
}

export default HomePage