import { useEffect, useState } from "react"
import { useGetRegisteredCoursesQuery } from "../../store/features/registeredCourseSlice"
function DisplayRegisteredCourses() {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setdata] = useState([])
    const {
        isLoading: courseIsLoading,
        data: courseData
    } = useGetRegisteredCoursesQuery()
    
    // if (courseIsLoading) {
    //   console.log("loading...");
    // }else if (courseData && courseData.length) {
      
    // }
   
    console.log(data);
    let content;
  return (
    <section>
        <h1>
            Register Courses
        </h1>
        <ol>
         {courseIsLoading ? (
          <li>loading...</li>
        ) : (
          <>
            {courseData && courseData.length ? (
              courseData.map(item => (
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