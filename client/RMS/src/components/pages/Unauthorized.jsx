import React from 'react'
import DashboardTemplate from '../templates/dashboardTemplate'

function Unauthorized() {
  return (
    <DashboardTemplate>
       <main className=' bg-slate-200 md:w-4/5 p-5 h-[90vh] overflow-y-scroll flex flex-col items-center justify-center'>
         <h1 className='text-5xl font-bold text-center mb-5'>401</h1>
         <h1 className='text-6xl font-bold text-center'>User Not Authorized</h1>
        </main>
    </DashboardTemplate>
  )
}

export default Unauthorized