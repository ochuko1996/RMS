import {useState} from 'react'
import Input from '../atom/Input'
import {VscPass} from 'react-icons/vsc'
import Button from '../atom/Button'
import { useAddAssessmentMutation } from '../../store/features/assessmentSlice'
// import { useGetAssessmentsQuery } from '../../store/features/assessmentSlice'
// imort {}
function AddAssessment({assessment}) {
  const [sent, setSent] = useState(false)
  const intialState = {
    classWork: "",
    exam: ""
  }
  const [addAssessment,{isLoading}]  = useAddAssessmentMutation()
  // console.log(postAssessment);
  const [formValues, setFormValues] = useState(intialState)
  const handleChange = (e)=>{
    setFormValues(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  const matricNo = assessment.createdBy
  const course = assessment?.course?._id
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      if (!formValues.classWork && !formValues.exam) {
        alert("field shouldn't be empty")
      }else {
        const newAssessment = await addAssessment(
          {
            classWork: formValues.classWork,
            exam: formValues.exam, 
            matricNo, 
            registeredCourse: course
          })
        console.log(newAssessment);
        console.log({
          classWork: formValues.classWork, 
          exam: formValues.exam, 
          matricNo, 
          registeredCourse: course
        });
        setFormValues(intialState)
        setSent(true)
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  let content;
  return (
    <div className=" mb-3  ">
            <form method='post' className='flex items-center border-b border-[--blue-gray-1] p-1'>
              <p className="lg:mr- capitalize w-1/5">
                Mat_no: {assessment ? assessment.createdBy : 223232}
              </p>
              <p className="lg:mr- capitalize w-1/5">
                {assessment?.course?.name}
              </p>
              <Input
                type="number"
                name="classWork"
                onChange={handleChange}
                className="rounded-sm lg:mr- p-1 w-1/5"
                placeholder={"30"}
                value={formValues.classWork}

              >
                Classwork: &nbsp; 
              </Input>
              <Input
                type="number"
                name="exam"
                onChange={handleChange}
                className=" rounded-sm lg:mr- p-1 w-1/5"
                value={formValues.exam}
                placeholder={"70"}
              >
                Examination: &nbsp; 
              </Input>
              <Button onClick={handleSubmit} disabled={sent}  className="bg-[--blue-gray-3] text-white p-1 rounded-sm w-1/5 flex justify-center">
                {sent ? <VscPass/> : "Submit"}
              </Button>
            </form>
          </div>
  )
}

export default AddAssessment