import { useEffect, useState } from "react"
import { useGetRegisteredCoursesQuery } from "../../store/features/registeredCourseSlice"
function DisplayRegisteredCourses() {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setdata] = useState([])
    const {
        isLoading: courseIsLoading,
        data: courseData
    } = useGetRegisteredCoursesQuery()
    
    useEffect(()=>{
      setIsLoading(courseIsLoading)
      setdata(courseData)
    },[isLoading, data])
    let content;
  return (
    <section>
        <h1>
            Register Courses
        </h1>
        <ol>
         {isLoading ? (
          <li>loading...</li>
        ) : (
          <>
            {data && data.length ? (
              data.map(item => (
                <li key={item._id}>{item.course.name}</li>
              ))
            ) : (
              <p>course is empty</p>
            )}
          </>
        )}
      </ol>
    </section>
  ) 
}

export default DisplayRegisteredCourses