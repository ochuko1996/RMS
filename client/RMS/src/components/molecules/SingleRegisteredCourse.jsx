import { Link } from "react-router-dom"
import Button from '../atom/Button'
import { useDeleteRegisterCourseMutation } from "../../store/features/registeredCourseSlice"
function SingleRegisteredCourse({item}) {
  const [deleteRegisterCourse, {error}] = useDeleteRegisterCourseMutation()
  const {_id: id, course: {name, code, unit}} = item
  const handleDelete = async ()=> {
    if (!id) {
      console.log("id not found");
    }
   try {
      await deleteRegisterCourse({id: id});
      console.log(`Course with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  }
  return (
    <div className="flex justify-between mb-2 border-[--blue-gray-1] border p-1 items-center">
        <div>{code}</div>
        <div>{name}</div>
        <div>{unit}</div>
        <div className="" > 
          <Link to={`/course_registration/${id}`} >
            <Button className="w-[inherit] bg-[--blue-gray-3] p-2 text-white rounded-sm cursor-pointer mr-1">
              Edit
            </Button>
          </Link>
          <Button onClick={handleDelete} className="w-[inherit] bg-[#be3333] p-2 text-white rounded-sm cursor-pointer">
            Delete
          </Button>
        </div>
    </div>
  )
}

export default SingleRegisteredCourse