import { useEffect, useState } from "react"
import { useGetRegisteredCoursesQuery, useDeleteRegisterCourseMutation } from "../../store/features/registeredCourseSlice"
import SingleRegisteredCourse from "./SingleRegisteredCourse"
function DisplayRegisteredCourses() {
  const [deleteRegisterCourse, {isLoading: loadingDeleteRegisteredCourse}] = useDeleteRegisterCourseMutation()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setdata] = useState([])
    const {
        isLoading: courseIsLoading,
        data: courseData
    } = useGetRegisteredCoursesQuery()
    
   
   
    let content;
  return (
    <section>
        <h1 className="text-center text-2xl mb-3 mt-3">
            Register Courses
        </h1>
        <article>
         {courseIsLoading ? (
          <div>loading...</div>
        ) : (
          <>
            {courseData && courseData.length ? (
              courseData.map(item => <SingleRegisteredCourse item={item} deleteRegisterCourse={deleteRegisterCourse} key={item._id} />)
            ) : (
              <p className="font-bold text-6xl mt-[10rem]">no course registered yet</p>
            )}
          </>
        )}
      </article>
    </section>
  ) 
}

export default DisplayRegisteredCourses