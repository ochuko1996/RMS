import React from 'react'
import SingleResult from '../molecules/singleResult'
function AdminResult(
    {
        loadingAllResult,
        checkForExistingAllResult,
        semesterOneAll,
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
        gpaSixAll,
        allResult
    }
) {
  return (
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
  )
}

export default AdminResult