import MainWrapper from "../molecules/MainWrapper"
import { useUpdateUserMutation, } from "../../store/features/userSlice"
import { useGetDepartmentQuery } from "../../store/features/departmentSlice"
import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "../atom/Button"
import {Link, useParams} from "react-router-dom"
import Input from "../atom/Input"

function EditStudent() {
  // const [isStudent, setIsStudent] = useState(true)
  const [ updateUser, {isLoading: loading, isError, error}] = useUpdateUserMutation()
  const id = useParams()
  console.log(id);
  const {
    isLoading,
    data: departments
  } = useGetDepartmentQuery()
  const initialData = {
    matricNo: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    department: ""
  };

  const [formValues, setFormValues] = useState(initialData);

  const handleSubmit = async (e) => {
    e.preventDefault()
      const response = await updateUser({
        _id: id,
        matricNo: formValues?.matricNo,
        firstName: formValues.firstName, 
        lastName: formValues.lastName, 
        email: formValues.email, 
        password: formValues.password, 
        department: formValues?.department
      })
      // console.log(signUp)
      setFormValues(initialData)
      
      // Error handling
      if(!response?.error?.error?.status === 500) {
        throw new Error("No server response")
      } else if (response?.error?.status === 409){
        toast("user or email already exist")
      }
    
  };
  const handleChange = (e) =>
    setFormValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  return (
    <MainWrapper>
        <main className="flex flex-col md:flex-row justify-between bg-slate-700 authWrapper">
          <ToastContainer/>
            <div className="md:w-1/2"></div>
            <div className="md:w-1/2 h-[100vh] flex flex-col items-center justify-center bg-[transparent]">
               <form action="" method="post" onSubmit={handleSubmit} className="authForm authSignUp">
                <Input 
                  type="number" className="authInput rounded-sm" 
                  placeholder={"22123"} 
                  value={formValues.matricNo}
                  name={"matricNo"} 
                  onChange={handleChange}
                >
                  Matric_No: 
                </Input>
                <Input 
                  placeholder={"ochuko"} 
                  name={"firstName"} 
                  className="authInput rounded-sm"  
                  value={formValues.firstName} 
                  onChange={handleChange}>
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
                <Input 
                  type={"password"} 
                  placeholder={"*******"} 
                  name={"password"} 
                  className="authInput rounded-sm" 
                  value={formValues.password} 
                  onChange={handleChange}
                >
                  Password: 
                </Input>
                <label>
                  Department:
                    <select name="department" value={formValues.department} onChange={handleChange}>
                      <option value="">select department</option>
                      {
                        isLoading ? content = <option value="csc" disabled>loading</option>
                        :(

                          departments.map((dept, index)=>{
                            return <option key={dept._id} value={dept._id} className="text-black">{dept.departmentName}</option>
                          })
                        )
                      }
                    </select>
                </label>
                <div>
                  <Button type={"submit"} className="w-full bg-[--blue-gray-3] rounded-sm h-10 text-white mt-5">
                    update user
                  </Button>
                </div>
              </form>
            </div>
        </main>
    </MainWrapper>
  )
}

export default EditStudent