import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../atom/Button"
import Input from "../atom/Input"
// import useAuth from "../../hooks/useAuth"
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import { useLoginMutation } from "../../store/features/authApiSlice"
import { useDispatch } from "react-redux"
import { setCredentials } from "../../store/api/authSlice"
// import { useGetGoogleUrlQuery } from "../../store/features/googleOauthSlice"
// const LOGIN_URL = 'auth/login'
function Auth() {
  const [showPwd, setShowPwd] = useState(false)
  // const {setAuth, auth, persist, setPersist} = useAuth()
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false )
  const navigate = useNavigate()
  const [login] = useLoginMutation()
  const dispatch = useDispatch()
  const from = location.state?.pathname || "/";
  // const {
  //   isLoading: loadingGoogleUrl,
  //   data: googleUrl
  // } = useGetGoogleUrlQuery()
  // const fetchedGoogleUrl = loadingGoogleUrl ? '' : googleUrl?.url
  // console.log(fetchedGoogleUrl);
  const initialData = {
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialData);
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        if (!formValues.email && !formValues.password) {
          alert('please enter email and password')
        }else if(formValues.email && formValues.password){
          const userData = await login({email: formValues.email, password: formValues.password})
          const accessToken = userData?.data?.user.accessToken
          const roles = userData?.data?.user.roles
          const firstName = userData?.data?.user?.user?.firstName
          dispatch(setCredentials({accessToken, roles, firstName}))
          navigate(from, {replace: true})
          setFormValues(initialData.email= "", initialData.password="")
        }
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
  };
  const handleChange = (e) => {
    setFormValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  // const emailRef = useRef()
  // useEffect(() => {
  //   emailRef.current.focus()
  // }, [])
  const togglePersist = ()=>{
    setPersist(prev => !prev)
  }
  useEffect(()=>{
    localStorage.setItem("persist", persist)
  },[persist])
  return (
    <main className="flex flex-col md:flex-row justify-between bg-slate-700 authWrapper">
        <div className="md:w-1/4 lg:w-1/2"></div>
        <div className="md:w-2/3 lg:w-1/2 h-[100vh] flex flex-col items-center justify-center bg-[transparent]">
         
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
            <span className="relative">
             {showPwd ? <FaEyeSlash onClick={()=> setShowPwd(!showPwd)} className="absolute top-9 right-1 cursor-pointer"/>: <FaEye onClick={()=> setShowPwd(!showPwd)} className="absolute top-9 right-1 cursor-pointer"/>}
              <Input
                type={showPwd ? "text" : "password"} 
                placeholder="*******" 
                name="password" 
                className="authInput rounded-sm" 
                value={formValues.password}
                onChange={handleChange}
              >
                Password: 
              </Input>
            </span>
            <div className="flex">
              <Input 
                type="checkbox" name="persist" id="persist" onChange={togglePersist} checked={persist}   /> 
                <span className="ml-1">
                  Keep me login
                </span>
            </div>
            <div>
              <Button type="submit" className="w-full bg-[--blue-gray-3] rounded-sm h-10 text-white mt-5">
                Login
              </Button>
              {/* <Button 
                disabled={loadingGoogleUrl}
                onClick={()=> {window.location.href = fetchedGoogleUrl}}
              >Login in with Google</Button> */}
            </div>
            <p className="mt-2">Have an account? <Link to="/signup">Sign Up</Link></p>
          </form>
        </div>
    </main>
  )
}

export default Auth