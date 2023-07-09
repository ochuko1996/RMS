import {useState} from 'react'
import Input from '../atom/Input'
import Button from '../atom/Button'

function AddCourses() {
    const initialData = {
        name: "",
        code: "",
        unit: "",
    }
    const [formValues, setformValues] = useState(initialData)
    const handleChange = (e)=> {
        setformValues(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(formValues.code, formValues.name, formValues.unit);
        setformValues(initialData)
    }
  return (
    <div className="flex items-center flex-col">
        <h1 className='font-bold text-xl'>Create New Course</h1>
        <form action="post" className='w-2/3 capitalize'>
            <Input 
                name={"name"}
                onChange={handleChange}
                placeholder={"Enter course name"}
                value={formValues.name}
                className={"authInput rounded-sm"}
            >
                name: &nbsp;
            </Input>
            <Input 
                name={"code"}
                onChange={handleChange}
                placeholder={"Enter course code"}
                value={formValues.code}
                className={"authInput rounded-sm"}
            >
                code: &nbsp;
            </Input>
            <Input 
                name={"unit"}
                onChange={handleChange}
                placeholder={"Enter code unit"}
                value={formValues.unit}
                type={"number"}
                className={"authInput rounded-sm"}
            >
                unit: &nbsp;
            </Input>
            <Button onClick={handleSubmit} className={"bg-[--blue-gray-3] text-white p-2 rounded-sm"}>
                submit
            </Button>
        </form>
    </div>
  )
}

export default AddCourses