import React from 'react'

function SingleResult({data}) {
     const {total, registeredCourse, point} = data
    const {name, code, unit} = registeredCourse.course
  return (
            <div key={data._id} className="grid result-grid">
            <div className="">{code}</div>
            <div className="">{name}</div>
            <div className="">{total}</div>
            <div className="">{point}</div>
            <div className="">{unit}</div>
            </div>
        )
}

export default SingleResult