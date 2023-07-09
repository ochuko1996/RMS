import React,{useState} from 'react'
import DashboardTemplate from '../templates/dashboardTemplate'

import AddAssessment from '../molecules/AddAssessments'
import Filter from '../molecules/filter'
import { useGetAllRegisteredCoursesQuery,  } from '../../store/features/registeredCourseSlice'
function Assessment() {
    const [useGetall, setUseGetall] = useState([])
    let content;
    const filteredAssessmentData  = (filteredData)=>{
      console.log("filteredData:", filteredData );
      setUseGetall(filteredData)
      // return filteredData
    }
    // const controlledData = filteredAssessmentData
    

  return (
    <DashboardTemplate>
        <main className=' bg-slate-200 md:w-4/5 p-5 h-[90vh] overflow-y-scroll'>
          <Filter useGet={useGetAllRegisteredCoursesQuery} filteredAssessmentData={filteredAssessmentData}/>
          <h1 className='font-bold text-center mb-5'>Enter Assessment</h1>
         {/* { [...Array(50).keys()].map((i) => <AddAssessment key={i}/>) } */}
         {
          // isLoading 
          // ?
          //   content = <h1>loading...</h1>
          //   : 
            (

              useGetall.map((assessment)=> {
                // console.log(assessment._id);
                return <AddAssessment key={assessment._id} assessment={assessment} />
              })
            )

         }
          
        </main> 
    </DashboardTemplate>
  )
}

export default Assessment