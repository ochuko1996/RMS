import Input from "../atom/Input"
import Button from "../atom/Button";
const USER_URL = '/user/:id'
const DEPARTMENT_URL = '/department'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setStudentModalFalse } from "../../store/features/studentModalSlice";
import axios from "../../api/axios";

function StudentModal() {
    const dispatch = useDispatch()
    const initialData = {
    matricNo: "",
    firstName: "",
    lastName: "",
    email: "",
    department: ""
  };

  const [formValues, setFormValues] = useState(initialData);
  const [depts, setDepts] = useState([])
  const fetchDepartment = async()=>{
    try {
      const response = await axios.get(DEPARTMENT_URL, {
        headers: {"Content-Type": 'application/json'},
        withCredentials: true
      }
      )
      console.log(response);
      return response
    } catch (error) {
      
    }
  }
  
  const handleDelete = async (id)=>{
    try {
      const response = await axios.delete(id,

        )
    } catch (error) {
      
    }
  }
  const handleSubmit = async () => {
    e.preventDefault()
    // console.log(setFormValues(initialData));
    try {
      const response = await axios.put(USER_URL, 
        JSON.stringify({matricNo: initialData.matricNo,firstName: initialData, lastName: initialData.lastName, email: initialData.email, departmentName: initialData.department}),
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        })
        console.log(response.data);
        setFormValues(initialData)
    } catch (error) {
      if(!error?.response) {
        throw new Error("No server response")
      } else if (error.response?.status === 409){
        throw new Error("User already exist")
      }else{
        throw new Error("Update failed failed")
      }
    }
    // await dispatch(signupAsync(formValues))
  };
  const handleChange = (e) =>
    setFormValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  useEffect(() => {
    setDepts(fetchDepartment())
  
  }, [])
  const handler = ()=>{
    dispatch(setStudentModalFalse())
  }
  return (
    <div className="modal-wrapper flex items-center justify-center absolute top-0 z-1000 w-full h-[100vh]">
        <form action="" method="post" onSubmit={handleSubmit} className="authForm relative studentModalForm">
            <h1 
                className="font-bold absolute top-5 right-12 bg-[#ff0000] p-1 cursor-pointer w-6 text-center" 
                onClick={()=> handler()}
            >
                X
            </h1>
            <Input 
                type="number" 
                className="authInput rounded-sm" 
                placeholder={"22123"} 
                value={formValues.matricNo} 
                onChange={handleChange}
            >
            Matric_No: 
            </Input>
            <Input 
                placeholder={"ochuko"} 
                name={"firstName"} 
                className="authInput rounded-sm"  
                value={formValues.firstName} 
                onChange={handleChange}
            >
              First Name:  
            </Input>
            <Input 
                placeholder={"ochuko"} 
                name={"lastName"} 
                className="authInput rounded-sm" 
                value={formValues.lastName} 
                onChange={handleChange}
            >
              Last Name:  
            </Input>
            <Input 
                type={"email"} 
                placeholder={"ochuko@gmail.com"} 
                name={"email"} 
                className="authInput rounded-sm" 
                value={formValues.email} 
                onChange={handleChange}
            >
              Email:  
            </Input>
                <label>
                  Department: &nbsp;
                  
                  <select 
                    name="department" 
                    value={formValues.department} 
                    onChange={handleChange}
                  >
                    <option value="csc">select department</option>
                    {/* {
                      depts.map((dept, index)=>{
                        return <option key={dept._id} value={dept.name}>{dept.name}</option>
                      })
                    } */}
                    
                    {/* <option value="csc">computer engineering</option>
                    <option value="csc">mass communicaiton</option>
                    <option value="csc">business administration</option> */}
                  </select>
                </label>
            <div className="flex justify-between w-full">
              <Button className="w-1/2 bg-[--blue-gray-3] rounded-sm h-10 text-white mt-5 mr-2">
                Update
              </Button>
              <Button className="w-1/2 bg-[#ff3000] rounded-sm h-10 text-white mt-5">
                Delete Student
              </Button>
            </div>
          </form>
    </div>
  )
}

export default StudentModal