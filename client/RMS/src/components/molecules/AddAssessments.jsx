import {useState} from 'react'
import Input from '../atom/Input'
import Button from '../atom/Button'
function AddAssessment() {
  const intialState = {
    classWork: "",
    exam: ""
  }
  const [formValues, setFormValues] = useState(intialState)
  const handleChange = (e)=>{
    setFormValues(prev => {
      return {
        prev,
        [e.target.name]: e.target.value
      }
    })
  }
  const handleSubmit = (e)=>{

  }
  return (
    <div className=" mb-3  ">
            <form action="" className='flex items-center border-b border-[--blue-gray-1] p-1'>
              <p className="lg:mr- capitalize w-1/5">
                Mat_no: 112323
              </p>
              <p className="lg:mr- capitalize w-1/5">
                Course: blasblas
              </p>
              <Input
                type={"number"}
                name={"classWork"}
                onChange={handleChange}
                className="rounded-sm lg:mr- p-1 w-1/5"
                placeholder={"30"}
                value={formValues.classWork}

              >
                Classwork: &nbsp; 
              </Input>
              <Input
                type={"number"}
                name={"examination"}
                onChange={handleChange}
                className=" rounded-sm lg:mr- p-1 w-1/5"
                value={formValues.exam}
                placeholder={"70"}
              >
                Examination: &nbsp; 
              </Input>
              <Button onClick={handleSubmit} className="bg-[--blue-gray-3] text-white p-1 rounded-sm w-1/5">
                Submit
              </Button>
            </form>
          </div>
  )
}

export default AddAssessment