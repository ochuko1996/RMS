import "./App.css"
import SignUp from "./components/pages/SignUp"
import Login from "./components/pages/Login"
import Dashboard from "./components/pages/Dashboard"
import Missing from "./components/pages/Missing"
import { Routes,Route, useLocation, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import RequireAuth from "./components/RequireAuth"
import useAuth from "./hooks/useAuth"

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
      //       <Route path="/" element={<Dashboard/>}/>
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
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }/>

        {/* catch all */}
        <Route path="*" element={<Missing/>}/>
      </Routes>
  )
}

export default App
