
function AllCourses({course}) {
  return (
    <section className="flex items-center flex-col mt-4">
        <ul className="flex justify-between w-4/5">
            <li>{course.code}</li>
            <li>{course.name}</li>
            <li>{course.unit}</li>
        </ul>
    </section>

  )
}

export default AllCourses