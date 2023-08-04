import React, { useState, useEffect } from 'react'
import DashboardTemplate from '../templates/dashboardTemplate'
import { selectCurrentRoles } from '../../store/api/authSlice'
import { useSelector } from 'react-redux'
import { useGetAllResultQuery, useGetSingleResultQuery } from '../../store/features/results'
import ErrorBoundary from '../../errorHandling'
import { data } from 'autoprefixer'
import SingleResult from '../molecules/singleResult'
import { roleList } from '../../constants/roles'
import SearchBar from '../molecules/SearchBar'
import queryString from 'query-string'
import ResultHeader from '../molecules/ResultHeader'

function Result() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchedResult, setSearchedResult] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const token = useSelector(selectCurrentRoles)

  let content;


  const obj = {
    search: searchQuery
  }

  const encodedParams = queryString.stringify(obj)

  const {
    isLoading: loadingAllResult,
    data: allResult,
    isError: errorAllResult
  } = useGetAllResultQuery(encodedParams)

  const handleSearch = async (e) => {
    e.preventDefault()
    // const searchResult = await allResult()
    setSearchedResult(allResult)
  }
  // console.log(searchedResult);
  const {
    isLoading: loadingResult,
    data: singleResult,
    isError: errorSingleResult,
    isSuccess,
  } = useGetSingleResultQuery()
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
  let semesterOneAll,
    gpaOneAll,
    semesterTwoAll,
    gpaTwoAll,
    semesterThreeAll,
    gpaThreeAll,
    semesterFourAll,
    gpaFourAll,
    semesterFiveAll,
    gpaFiveAll,
    semesterSixAll,
    gpaSixAll;
  if (loadingResult) {
    console.log("loading...");
  }
  else if (singleResult.result && singleResult.result.length) {
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
  // search result 
  if (loadingAllResult) {
    console.log("loading...");
  }
  else if (allResult.result && allResult.result.length) {
    semesterOneAll = allResult.result[0].semesterOne
    gpaOneAll = allResult.result[0].GPA_One
    semesterTwoAll = allResult.result[1].semesterTwo
    gpaTwoAll = allResult.result[1].GPA_Two
    semesterThreeAll = allResult.result[2].semesterThree
    gpaThreeAll = allResult.result[2].GPA_Three
    semesterFourAll = allResult.result[3].semesterFour
    gpaFourAll = allResult.result[3].GPA_Four
    semesterFiveAll = allResult.result[4].semesterFive
    gpaFiveAll = allResult.result[4].GPA_Five
    semesterSixAll = allResult.result[5].semesterSix
    gpaSixAll = allResult.result[5].GPA_Six
  }
  const checkForExistingSingleResult = singleResult?.result?.[0]?.semesterOne
    ?? singleResult?.result?.[1]?.semesterTwo
    ?? singleResult?.result?.[2]?.semesterThree
    ?? singleResult?.result?.[3]?.semesterFour
    ?? singleResult?.result?.[4]?.semesterFive
    ?? singleResult?.result?.[5]?.semesterSix;
  const checkForExistingAllResult = allResult?.result?.[0]?.semesterOne
    ?? allResult?.result?.[1]?.semesterTwo
    ?? allResult?.result?.[2]?.semesterThree
    ?? allResult?.result?.[3]?.semesterFour
    ?? allResult?.result?.[4]?.semesterFive
    ?? allResult?.result?.[5]?.semesterSix;
  if (token.length === 1) {
    content = (
      <section>
        <ResultHeader />
        {
          loadingResult ? <p>loading...</p>
            // : singleResult.result[0].semesterOne && singleResult.result[0].semesterOne.length ? (
            : checkForExistingSingleResult ? (
              <>
                {
                  semesterOne && semesterOne.length ? (
                    <section className='border border-[--blue-gray-2] p-2 mb-2'>
                      {
                        semesterOne.map(data => <SingleResult key={data._id} data={data} />)
                      }
                      <p className='mt-4 font-bold'>
                        Semester One GPA: {gpaOne}
                      </p>
                    </section>
                  ) : ""
                }
                {
                  semesterTwo && semesterTwo.length ? (
                    <section className='border border-[--blue-gray-2] p-2 mb-2'>
                      {semesterTwo.map(data => <SingleResult key={data._id} data={data} />)}
                      <p className='mt-4 font-bold'>
                        Semester Two GPA: {gpaTwo}
                      </p>
                    </section>
                  ) : ""
                }
                {
                  semesterThree && semesterThree.length ? (
                    <section className='border border-[--blue-gray-2] p-2 mb-2'>
                      {semesterThree.map(data => <SingleResult key={data._id} data={data} />)}
                      <p className='mt-4 font-bold'>
                        Semester Three GPA: {gpaThree}
                      </p>
                    </section>
                  ) : ""
                }
                {
                  semesterFour && semesterFour.length ? (
                    <section className='border border-[--blue-gray-2] p-2 mb-2'>
                      {semesterFour.map(data => <SingleResult key={data._id} data={data} />)}
                      <p className='mt-4 font-bold'>
                        Semester Four GPA: {gpaFour}
                      </p>
                    </section>
                  ) : ""
                }
                {
                  semesterFive && semesterFive.length ? (
                    <section className='border border-[--blue-gray-2] p-2 mb-2'>
                      {semesterFive.map(data => <SingleResult key={data._id} data={data} />)}
                      <p className='mt-4 font-bold'>
                        Semester Five GPA: {gpaFive}
                      </p>
                    </section>
                  ) : ""
                }
                {
                  semesterSix && semesterSix.length ? (
                    <section className='border border-[--blue-gray-2] p-2 mb-2'>
                      {semesterSix.map(data => <SingleResult key={data._id} data={data} />)}
                      <p className='mt-4 font-bold'>
                        Semester Six GPA: {gpaSix}
                      </p>
                    </section>
                  ) : ""
                }
                <h1 className='text-2xl mt-5 font-bold'>Cumulative Grade Point Average : {singleResult.cgpa} </h1>
              </>
            ) : <p className='text-6xl font-bond text-center mt-[10rem]'>No result Yet </p>
        }
      </section>
    )
  } else if (token.length > 1) {
    content = (
      <main>
        {/* <h1 className='font-bold text-xl'>Search Result</h1> */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
        <ResultHeader />
        <section>
          {
            loadingAllResult ? <p>loading...</p>
              // : allResult.result[0].semesterOne && allResult.result[0].semesterOne.length ? (
              : checkForExistingAllResult ? (
                <>
                  {
                    semesterOneAll && semesterOneAll.length ? (
                      <section className='border border-[--blue-gray-2] p-2 mb-2'>
                        {
                          semesterOneAll.map(data => <SingleResult key={data._id} data={data} />)
                        }
                        <p className='mt-4 font-bold'>
                          Semester One GPA: {gpaOneAll}
                        </p>
                      </section>
                    ) : ""
                  }
                  {
                    semesterTwoAll && semesterTwoAll.length ? (
                      <section className='border border-[--blue-gray-2] p-2 mb-2'>
                        {semesterTwoAll.map(data => <SingleResult key={data._id} data={data} />)}
                        <p className='mt-4 font-bold'>
                          Semester Two GPA: {gpaTwoAll}
                        </p>
                      </section>
                    ) : ""
                  }
                  {
                    semesterThreeAll && semesterThreeAll.length ? (
                      <section className='border border-[--blue-gray-2] p-2 mb-2'>
                        {semesterThreeAll.map(data => <SingleResult key={data._id} data={data} />)}
                        <p className='mt-4 font-bold'>
                          Semester Three GPA: {gpaThreeAll}
                        </p>
                      </section>
                    ) : ""
                  }
                  {
                    semesterFourAll && semesterFourAll.length ? (
                      <section className='border border-[--blue-gray-2] p-2 mb-2'>
                        {semesterFourAll.map(data => <SingleResult key={data._id} data={data} />)}
                        <p className='mt-4 font-bold'>
                          Semester Four GPA: {gpaFourAll}
                        </p>
                      </section>
                    ) : ""
                  }
                  {
                    semesterFiveAll && semesterFiveAll.length ? (
                      <section className='border border-[--blue-gray-2] p-2 mb-2'>
                        {semesterFiveAll.map(data => <SingleResult key={data._id} data={data} />)}
                        <p className='mt-4 font-bold'>
                          Semester Five GPA: {gpaFiveAll}
                        </p>
                      </section>
                    ) : ""
                  }
                  {
                    semesterSixAll && semesterSixAll.length ? (
                      <section className='border border-[--blue-gray-2] p-2 mb-2'>
                        {semesterSixAll.map(data => <SingleResult key={data._id} data={data} />)}
                        <p className='mt-4 font-bold'>
                          Semester Six GPA: {gpaSixAll}
                        </p>
                      </section>
                    ) : ""
                  }
                  <h1 className='text-2xl mt-5 font-bold'>Cumulative Grade Point Average : {allResult.cgpa} </h1>
                </>
              ) : <p className='text-6xl font-bond text-center mt-[10rem]'>No result found yet </p>
          }
        </section>
      </main>
    )
  }

  return (
    <ErrorBoundary>
      <DashboardTemplate>
        <main className=' bg-slate-200 md:w-4/5 p-5 h-[90vh] overflow-y-scroll'>
          {
            content
          }
        </main>
      </DashboardTemplate>
    </ErrorBoundary>
  )
}

export default Result