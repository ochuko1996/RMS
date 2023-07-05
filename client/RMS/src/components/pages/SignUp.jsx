import { useState, useEffect } from "react"
import Button from "../atom/Button"
import {Link} from "react-router-dom"
import Input from "../atom/Input"
import axios from "../../api/axios"
import { useSignupMutation } from "../../store/features/authApiSlice"

const REGISTER_URL = '/auth/register'
const DEPARTMENT_URL = '/department'

function SignUp() {
  const [isStudent, setIsStudent] = useState(true)
  const [depts, setDepts] = useState([])
  const signup = useSignupMutation()
  const initialData = {
    matricNo: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    department: ""
  };

  const [formValues, setFormValues] = useState(initialData);
  const fetchDepartment = async()=>{
    try {
      const response = await axios.get(DEPARTMENT_URL, {
        headers: {"Content-Type": 'application/json'},
        // withCredentials: true
      }
      ) 
      setDepts(response.data)
    } catch (error) {
      
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(setFormValues(initialData));
    try {
      // const response = await axios.post(REGISTER_URL, 
      //   JSON.stringify(
          // {
          //   matricNo: formValues.matricNo ,
          //   firstName: formValues.firstName, 
          //   lastName: formValues.lastName, 
          //   email: formValues.email, 
          //   password: formValues.password, 
          //   department: formValues.department
          // }
      //   ),
      //   {
      //     headers: {'Content-Type': 'application/json'},
      //     withCredentials: true
      //   })
      const signUp = await signup({
            matricNo: formValues.matricNo ,
            firstName: formValues.firstName, 
            lastName: formValues.lastName, 
            email: formValues.email, 
            password: formValues.password, 
            department: formValues.department
          })
        setFormValues(initialData)
    } catch (error) {
      if(!error?.response) {
        throw new Error("No server response")
      } else if (error.response?.status === 409){
        throw new Error("User already exist")
      }else{
        throw new Error("Registration failed")
      }
    }
  };
  const handleChange = (e) =>
    setFormValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  useEffect(() => {
    fetchDepartment()
  }, [])
  
  return (
    <main className="flex flex-col md:flex-row justify-between bg-slate-700 authWrapper">
        <div className="md:w-1/2"></div>
        <div className="md:w-1/2 h-[100vh] flex flex-col items-center justify-center bg-[transparent]">
          {/* <h1 className="mb-5">
            Register
          </h1> */}
          <div className="btn-wrapper mb-5">
            <Button className={`mr-10 ${isStudent ? "bg-[--blue-gray-3] text-white" : "bg-[#faf7f7]"}  p-[10px] rounded-sm`} onClick={()=> setIsStudent(true)}>
              Student
            </Button>
            <Button className={`p-[10px] ${isStudent ? "bg-[#faf7f7]" : "bg-[--blue-gray-3] text-white" }  bordered rounded-sm`}  onClick={()=> setIsStudent(false)}>
              Admin
            </Button>
          </div>
          <form action="" method="post" onSubmit={handleSubmit} className="authForm authSignUp">
            {
              isStudent
                 ?  
              <Input 
                type="number" className="authInput rounded-sm" 
                placeholder={"22123"} 
                value={formValues.matricNo}
                name={"matricNo"} 
                onChange={handleChange}
              >
                Matric_No: 
              </Input>
              :
              ""
            } 
          
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
          
            <Input type={"email"} placeholder={"ochuko@gmail.com"} name={"email"} className="authInput rounded-sm" value={formValues.email} onChange={handleChange}>
              Email:  
            </Input>
            <Input type={"password"} placeholder={"*******"} name={"password"} className="authInput rounded-sm" value={formValues.password} onChange={handleChange}>
              Password: 
            </Input>
            {
              isStudent
                ?
                <label>
                  Department:
                  
                  <select name="department" value={formValues.department} onChange={handleChange}>
                    <option value="csc" disabled>select department</option>
                    {
                      depts.map((dept, index)=>{
                        console.log(dept);
                        return <option key={dept._id} value={dept._id} className="text-black">{dept.departmentName}</option>
                      })
                    }
                    
                    {/* <option value="csc">computer engineering</option>
                    <option value="csc">mass communicaiton</option>
                    <option value="csc">business administration</option> */}
                  </select>
                </label>
                :
                ""

            }
            <div>
              <Button type={"submit"} className="w-full bg-[--blue-gray-3] rounded-sm h-10 text-white mt-5">
                Sign Up
              </Button>
            </div>
            <p className="mt-2 ">Have an account? <Link to="/login" className="">Login</Link></p>
          </form>
        </div>
    </main>
  )
}

export default SignUp