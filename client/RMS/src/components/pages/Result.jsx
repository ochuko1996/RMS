import { useState } from 'react'
import { selectCurrentRoles } from '../../store/api/authSlice'
import { useSelector } from 'react-redux'
import { useGetAllResultQuery, useGetSingleResultQuery } from '../../store/features/results'
import ErrorBoundary from '../../errorHandling'
import SearchBar from '../molecules/SearchBar'
import queryString from 'query-string'
import ResultHeader from '../molecules/ResultHeader'
import AdminResult from '../organisms/AdminResult'
import StudentResult from '../organisms/StudentResult'
import MainWrapper from '../molecules/MainWrapper'

function Result() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchedResult, setSearchedResult] = useState([])
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
      <main>
          <ResultHeader />
          <StudentResult
            loadingResult={loadingResult}
            checkForExistingSingleResult={checkForExistingSingleResult}
            semesterOne={semesterOne}
            gpaOne={gpaOne}
            semesterTwo ={semesterTwo}
            gpaTwo ={gpaTwo}
            semesterThree={semesterThree}
            gpaThree={gpaThree}
            semesterFour={semesterFour}
            gpaFour={gpaFour}
            semesterFive={semesterFive}
            gpaFive={gpaFive}
            semesterSix={semesterSix}
            gpaSix={gpaSix}
            singleResult={singleResult}
          />
       
      </main>
    )
  } else if (token.length > 1) {
    content = (
      <main>
        {/* <h1 className='font-bold text-xl'>Search Result</h1> */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
        <ResultHeader />
        <AdminResult
          loadingAllResult={loadingAllResult}
          checkForExistingAllResult={checkForExistingAllResult}
          semesterOneAll={semesterOneAll}
          gpaOneAll={gpaOneAll}
          semesterTwoAll ={semesterTwoAll}
          gpaTwoAll ={gpaTwoAll}
          semesterThreeAll={semesterThreeAll}
          gpaThreeAll={gpaThreeAll}
          semesterFourAll={semesterFourAll}
          gpaFourAll={gpaFourAll}
          semesterFiveAll={semesterFiveAll}
          gpaFiveAll={gpaFiveAll}
          semesterSixAll={semesterSixAll}
          gpaSixAll={gpaSixAll}
          allResult={allResult}
        />
       
      </main>
    )
  }

  return (
    <ErrorBoundary>
      <MainWrapper>
          {
            content
          }
      </MainWrapper>
    </ErrorBoundary>
  )
}

export default Result