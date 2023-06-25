import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import Button from "../atom/Button"
import Input from "../atom/Input"
import axios from "../../api/axios"
import useAuth from "../../hooks/useAuth"

const LOGIN_URL = 'auth/login'
function Auth() {
  const {setAuth} = useAuth
  const initialData = {
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialData);
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(LOGIN_URL, 
        JSON.stringify({email: formValues.email, password: formValues.password}),
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }) 
        console.log(response?.data);
        console.log(JSON.stringify(response?.data));

        const accessToken = response?.data.accessToken
        const roles = response?.data.roles
        setAuth({email, password, roles, accessToken})
        console.log(setFormValues(initialData))
    } catch (error) {
        if(!error?.response) {
          throw new Error("No server response")
        } else if (error.response?.status === 400){
          throw new Error("Missing Username or Password")
        }else if (error.response?.status === 401){
          throw new Error("Unauthorized")
        }else{
          throw new Error("Login Failed")
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
  // const emailRef = useRef()
  // useEffect(() => {
  //   emailRef.current.focus()
  // }, [])
  
  return (
    <main className="flex flex-col md:flex-row justify-between bg-slate-700">
        <div className="md:w-1/2"></div>
        <div className="md:w-1/2 h-[100vh] flex flex-col items-center justify-center bg-[transparent]">
          <h1 className="mb-5">
            Login
          </h1>
         <form action="" method="post" onSubmit={handleSubmit} className="authForm">
            <Input 
              type="email" 
              placeholder="ochuko@gmail.com" 
              name="email" 
              className="authInput rounded-sm"
              // ref={emailRef}
              value={formValues.email}
              onChange={handleChange}
            >
              Email:  
            </Input>
            <Input 
              type="password" 
              placeholder="*******" 
              name="password" 
              className="authInput rounded-sm" 
              value={formValues.email}
              onChange={handleChange}>
              Password: 
            </Input>
            <div>
              <Button type="submit" className="w-full bg-[--blue-gray-3] rounded-sm h-10 text-white mt-5">
                Login
              </Button>
            </div>
            <p className="mt-2">Have an account? <Link to="/signup">Sign Up</Link></p>
          </form>
        </div>
    </main>
  )
}

export default Auth