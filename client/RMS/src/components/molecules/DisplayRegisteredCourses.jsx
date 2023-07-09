import { useEffect, useState } from "react"
import { useGetRegisteredCoursesQuery } from "../../store/features/registeredCourseSlice"
function DisplayRegisteredCourses() {
    const {
        isLoading,
        data
    } = useGetRegisteredCoursesQuery()
    
    const courses = data;
    console.log(courses);
    let content;
  return (
    <section>
        <h1>
            Register Courses
        </h1>
        <ol>
        {
          isLoading ? content = <li>loading...</li>
          :
          courses.map(item => {
            const {course: name } = item
            const course = item.course
            return <li key={item._id}>{course.name}</li>
          }) 
      
        }
      </ol>
    </section>
  ) 
}

export default DisplayRegisteredCourses