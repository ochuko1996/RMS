import "./App.css"
import SignUp from "./components/pages/SignUp"
import Login from "./components/pages/Login"
import Students from "./components/pages/Students"
import Courses from "./components/pages/Courses"
import Missing from "./components/pages/Missing"
import { Routes,Route, useLocation, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import RequireAuth from "./components/RequireAuth"
import useAuth from "./hooks/useAuth"
import Result from "./components/pages/Result"
import Assessment from "./components/pages/Assessment"
import CourseRegistration from "./components/pages/CourseRegistration"
import Department from "./components/pages/Department"
import HomePage from "./components/pages/HomePage"
import PersistLogin from "./components/PersistLogin"


function App() {

  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
          {/* public routes */}
          <Route path="login" element={<Login/>}/> 
          <Route path="signup" element={<SignUp/>}/> 
          
          {/* protected routes */}
          <Route element={<RequireAuth/>}>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/assessment" element={<Assessment/>}/>
            <Route path="/students" element={<Students/>}/>
            <Route path="/department" element={<Department/>}/>
            <Route path="/result" element={<Result/>}/>
            <Route path="/courses" element={<Courses/>}/>
            <Route path="/course_registration" element={<CourseRegistration/>}/>
          </Route>
      
          {/* catch all */}
          <Route path="*" element={<Missing/>}/>
        </Route>
      </Routes>
   
  )
}

export default App
