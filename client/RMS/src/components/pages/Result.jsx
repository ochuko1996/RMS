import React,{useState, useEffect} from 'react'
import DashboardTemplate from '../templates/dashboardTemplate'
import { selectCurrentRoles } from '../../store/api/authSlice'
import { useSelector } from 'react-redux'
import { useGetAllResultQuery, useGetSingleResultQuery } from '../../store/features/results'
import ErrorBoundary from '../../errorHandling'
import { data } from 'autoprefixer'
import SingleResult from '../molecules/singleResult'


function Result() {
  const initialData = {
    semesterOneData : [],
    semesterTwoData : [],
    semesterThreeData : [],
    semesterFourData : [],
    semesterFiveData : [],
    semesterSixData : [],
  }
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  let content;
  const token = useSelector(selectCurrentRoles)
  const {
    isLoading: loadingAllResult,
    data: allResult,
    isError: errorAllResult
  } = useGetAllResultQuery()

  const {
    isLoading: loadingResult,
    data: singleResult,
    isError: errorSingleResult,
    isSuccess,
  } = useGetSingleResultQuery()
  // useEffect(()=>{
  //   setIsLoading(loadingResult)
  //   setDatas(singleResult)
  // },[isLoading, datas])
  let semesterOne,
    gpaOne,
    semesterTwo,
    gpaTwo,
    semesterThree,
    gpaThree,
    semesterFour,
    gpaFour,
    semesterFive,
    gpaFive,
    semesterSix,
    gpaSix;
  if (loadingResult) {
    console.log("loading...");
  }
  else if(singleResult.result && singleResult.result.length){
    console.log(singleResult.result);
    console.log("success");
     semesterOne = singleResult.result[0].semesterOne
     gpaOne = singleResult.result[0].GPA_One
     semesterTwo = singleResult.result[1].semesterTwo
     gpaTwo = singleResult.result[1].GPA_Two
     semesterThree = singleResult.result[2].semesterThree
     gpaThree = singleResult.result[2].GPA_Three
     semesterFour = singleResult.result[3].semesterFour
     gpaFour = singleResult.result[3].GPA_Four
     semesterFive = singleResult.result[4].semesterFive
     gpaFive = singleResult.result[4].GPA_Five
     semesterSix = singleResult.result[5].semesterSix
     gpaSix = singleResult.result[5].GPA_Six
  }
  
  if (token[0] === 1000) {
    content = (
      <section>
       
        {
          loadingResult ? <p>loading...</p>
          : singleResult.result[0].semesterOne && singleResult.result[0].semesterOne.length ? (
            <>
                {
                  semesterOne && semesterOne.length ? (
                    <section>
                    {
                      semesterOne.map(data => <SingleResult key={data._id} data={data}/> )
                    }
                    <p className='mt-4 font-bold'>
                      Semester One GPA: {gpaOne}
                    </p>
                    </section>
                  ) : ""
                }  
                {
                  semesterTwo && semesterTwo.length ? (
                    <section>
                     {semesterTwo.map(data => <SingleResult key={data._id} data={data}/> )}
                      <p className='mt-4 font-bold'>
                        Semester Two GPA: {gpaTwo}
                      </p>
                    </section>
                  ): ""
                }  
                {
                  semesterThree && semesterThree.length ? (
                    <section>
                     {semesterThree.map(data => <SingleResult key={data._id} data={data}/> )}
                      <p className='mt-4 font-bold'>
                        Semester Three GPA: {gpaThree}
                      </p>
                    </section>
                  ): ""
                }  
                {
                  semesterFour && semesterFour.length ? (
                    <section>
                    {semesterFour.map(data => <SingleResult key={data._id} data={data}/> )}
                      <p className='mt-4 font-bold'>
                        Semester Four GPA: {gpaFour}
                      </p>
                    </section>
                  ): ""
                } 
                {
                  semesterFive && semesterFive.length ? (
                    <section>
                    {semesterFive.map(data => <SingleResult key={data._id} data={data}/> )}
                      <p className='mt-4 font-bold'>
                        Semester Five GPA: {gpaFive}
                      </p>
                    </section>
                  ): ""
                } 
                {
                  semesterSix && semesterSix.length ? (
                    <section>
                     {semesterSix.map(data => <SingleResult key={data._id} data={data}/> )}
                      <p className='mt-4 font-bold'>
                        Semester Six GPA: {gpaSix}
                      </p>
                    </section>
                  ): ""
                } 
              <h1 className='text-2xl mt-5 font-bold'>Cumulative Grade Point Average : {singleResult.cgpa} </h1>
            </>
          ): <p className='text-6xl font-bond text-center mt-[10rem]'>No result Yet </p>
        }
      </section>
    )
  } else if (token[1] === 1111){
    content = (
      <main>
        <h1 className='font-bold text-xl'>Search Result</h1>
      </main>
    )
  }
  
  return (
    <ErrorBoundary>
      <DashboardTemplate>
          <main className=' bg-slate-200 md:w-4/5 p-5 h-[90vh] overflow-y-scroll'>
             <h1 className='text-2xl capitalize text-center mb-3'>cumulated result</h1>
              <div className="grid result-grid">
                <div className="capitalize font-bold">code</div>
                <div className="capitalize font-bold">course name</div>
                <div className="capitalize font-bold">score</div>
                <div className="capitalize font-bold">point</div>
                <div className="capitalize font-bold">score unit</div>
              </div>
              {
                content
              }
          </main>
      </DashboardTemplate>
    </ErrorBoundary>
  )
}

export default Result