import React from 'react'
import SingleResult from '../molecules/singleResult'
function StudentResult({
    loadingResult,
    checkForExistingSingleResult,
    semesterOne,
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
    gpaSix,
    singleResult
}) {
  return (
     <section>
        {/* <ResultHeader /> */}
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
}

export default StudentResult