import "./App.css"
import SignUp from "./components/pages/SignUp"
import Login from "./components/pages/Login"
import Students from "./components/pages/Students"
import Courses from "./components/pages/Courses"
import Missing from "./components/pages/Missing"
import { Routes,Route } from "react-router-dom"
import Layout from "./components/Layout"
import RequireAuth from "./components/RequireAuth"
import Result from "./components/pages/Result"
import Assessment from "./components/pages/Assessment"
import CourseRegistration from "./components/pages/CourseRegistration"
import Department from "./components/pages/Department"
import HomePage from "./components/pages/HomePage"
import Unauthorized from "./components/pages/Unauthorized"
import { roleList } from "./constants/roles"
import EditStudent from "./components/pages/EditStudent"
import EditRegisteredCourse from "./components/pages/EditRegisteredCourse"
import EditCourse from "./components/pages/EditDepartment"
import EditDepartment from "./components/pages/EditDepartment"


function App() {

  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
          {/* public routes */}
          <Route path="login" element={<Login/>}/> 
          <Route path="signup" element={<SignUp/>}/> 
          <Route path="unauthorized" element={<Unauthorized/>}/> 
          
          {/* protected routes */}
          <Route element={<RequireAuth allowedRoles={[roleList.admin, roleList.student]} />}>
            <Route path="/" element={<HomePage/>}/>
          </Route>
          
          <Route element={<RequireAuth allowedRoles={[roleList.admin]} />}>
            <Route path="/assessment" element={<Assessment/>}/>
            <Route path="/students" element={<Students/>}/>
            <Route path="/students/:id" element={<EditStudent/>}/>
            <Route path="/department" element={<Department/>}/>
            <Route path="/department/:id" element={<EditDepartment/>}/>
            <Route path="/courses" element={<Courses/>}/>
            <Route path="/courses/:id" element={<EditCourse/>}/>
          </Route>
         
          <Route element={<RequireAuth allowedRoles={[roleList.admin, roleList.student]} />}>
            <Route path="/result" element={<Result/>}/>
            <Route path="/course_registration" element={<CourseRegistration/>}/>
            <Route path="/course_registration/:id" element={<EditRegisteredCourse/>}/>
          </Route>
      
          {/* catch all */}
          <Route path="*" element={<Missing/>}/>
        </Route>
      </Routes>
   
  )
}

export default App
