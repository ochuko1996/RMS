import React from 'react'
import DashboardTemplate from '../templates/dashboardTemplate'
import Button from '../atom/Button'
function HomePage() {
 
  return (
    <DashboardTemplate>
        <main className=' bg-slate-200 md:w-4/5  h-[90vh] '>
           <div className="bg-wrapper h-full flex justify-center items-center">
            <div className="overlay modal-wrapper"/>
            <h1 className='fw-bold text-4xl text-center text-white absolute z-20'>
              "Success is the sum of small efforts, repeated day in and day out." 
              <br/>
              <br/>
              <span className='mt-5'>
                Robert Collier
              </span> 
            </h1>
           </div>
        </main>
    </DashboardTemplate>
  )
}

export default HomePage