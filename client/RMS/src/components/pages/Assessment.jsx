import React,{useState} from 'react'
import DashboardTemplate from '../templates/dashboardTemplate'

import AddAssessment from '../molecules/AddAssessments'
import Filter from '../molecules/filter'

function Assessment() {
  
  return (
    <DashboardTemplate>
        <main className=' bg-slate-200 md:w-4/5 p-5 h-[90vh] overflow-y-scroll'>
          <Filter/>
          <h1 className='font-bold text-center mb-5'>Enter Assessment</h1>
         { [...Array(50).keys()].map((i) => <AddAssessment key={i}/>) }
          
        </main> 
    </DashboardTemplate>
  )
}

export default Assessment