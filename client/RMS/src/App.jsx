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

const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  // const token = localStorage.getItem("token");
  const {auth} = useAuth()
  const location = useLocation()
  

  if (!auth) {
    return <Navigate to={redirectPath} state={{from: location}}  replace />;
  }

  return children;
};

function App() {

  return (
      // <Routes>
      //   <Route path="/" element={Layout}>
      //     {/* public routes */}
      //     <Route path="login" element={<Login/>}/> 
      //     <Route path="signup" element={<SignUp/>}/> 
          
      //     {/* protected routes */}
      //     <Route element={<RequireAuth/>}>
      //       <Route path="/" element={<Students/>}/>
      //     </Route>
      
      //     {/* catch all */}
      //     <Route path="*" element={<Missing/>}/>
      //   </Route>
      // </Routes>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login/>}/> 
        <Route path="/signup" element={<SignUp/>}/> 

        {/* protected routes */}
        {/* <Route path="/" element={
          <ProtectedRoute> */}
            {/* <Students/> */}
            <Route path="/" element={<HomePage/>} />
            <Route path="/students" element={<Students/>} />
            <Route path="/courses" element={<Courses/>} />
            <Route path="/result" element={<Result/>} />
            <Route path="/assessment" element={<Assessment/>} />
            <Route path="/course-registration" element={<CourseRegistration/>} />
            <Route path="/department" element={<Department/>} />
          {/* </ProtectedRoute> */}
        {/* }/> */}
        
        {/* catch all */}
        <Route path="*" element={<Missing/>}/>
      </Routes>
  )
}

export default App
