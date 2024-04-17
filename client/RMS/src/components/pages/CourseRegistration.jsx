import {useState} from 'react'
import DashboardTemplate from '../templates/dashboardTemplate'
import { useGetCoursesQuery } from '../../store/features/coursesSlice'
import { level, period, semester } from '../../constants/filters'
import Button from '../atom/Button'
import { useAddRegisterCourseMutation} from '../../store/features/registeredCourseSlice'
import DisplayRegisteredCourses from '../molecules/DisplayRegisteredCourses'
import MainWrapper from '../molecules/MainWrapper'

function CourseRegistration() {
  const [datas, setDatas] = useState([])
  const {
    isError,
    isLoading,
    error,
    data: courses
  } = useGetCoursesQuery()

  const initialData = {
    course: "",
    semester: "",
    level: "",
    period: ""
  }
  const [addRegisterCourse, ] = useAddRegisterCourseMutation()
  const [formValues, setFormValues] = useState(initialData)
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      if (!formValues.course && !formValues.level && !formValues.period && !formValues.semester) {
        throw new Error("please fill your details")
      }
      const registeredCourses = await addRegisterCourse({course: formValues.course, level: formValues.level, period: formValues.period, semester: formValues.semester})
      console.log(registeredCourses);
      console.log(formValues.course, formValues.level, formValues.period, formValues.semester);
      setFormValues(initialData)
      
    } catch (error) {
      if(!error?.response) {
        throw new Error("No server response")
      } else if (error.response?.status === 409){
        throw new Error("course already registered")
      } else if (error.response?.status === 401){
        throw new Error("unauthorized")
      }else{
        throw new Error("Registration failed")
      }
    }


  }
   const handleChange = (e) =>
    setFormValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
  });
  let content;
  return (
    <MainWrapper>
      <h1>Course registration</h1>
      <div className="register-course-wrapper">
       <form action="" className=''>
         <label htmlFor="course">
                courses: &nbsp;
                 <select name="course" value={formValues.course} onChange={handleChange} >
                     <option value="">select course</option>

                   {
                     isLoading ? <option>loading...</option>
                     : (
                       courses.map(course=>{ 
                        const {_id: id} = course 
                        // console.log(course);
                         return <option  key={id} value={id}>{course.name}</option>
                       }) 
                       
                     )
                     
                  }

               
             </select> 
                
         </label>
         <label htmlFor="semester">
                Semester: &nbsp;
                <select onChange={handleChange} name="semester" value={formValues.semester}>
                       <option value="">select semester</option>
                  {
                    semester.map(semester=>{ 
                      return <option  key={semester.id} value={semester.semester}>{semester.semester}</option>
                     })
                  }
                </select>
         </label>
         <label htmlFor="level">
                Level: &nbsp;
                <select onChange={handleChange} name="level" value={formValues.level}>
                     <option value="">select level</option>
                  {
                    level.map(level=>{ 
                      return <option  key={level.id} value={level.level}>{level.level}</option>
                     })
                  }
                </select>
         </label>
         <label htmlFor="period">
             Period: &nbsp;
             <select onChange={handleChange} name="period" value={formValues.period}>
               <option value="">select period</option>
               {
                 period.map(period=>{ 
                   return <option key={period.id} defaultValue={period.period[0]}  value={period.period}>{period.period}</option>
                 })
               }
             </select>
         </label>
         <Button onClick={handleSubmit} className="bg-[--blue-gray-3] text-white p-1 rounded-sm">
           Submit
         </Button>
       </form>
      </div>
      <DisplayRegisteredCourses/>
    </MainWrapper>
  )
}

export default CourseRegistration