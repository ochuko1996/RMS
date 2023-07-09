import { useLocation, Navigate, Outlet } from "react-router-dom";
import {  useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentRoles } from "../store/api/authSlice";

const RequireAuth = ({allowedRoles})=> {
    // const {auth} = useAuth()
    const token = useSelector(selectCurrentToken)
    const roles = useSelector(selectCurrentRoles)
    const location = useLocation()
    // console.log(token);
    return (
        roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet/>
            : token 
                ? <Navigate to="/unauthorized" state={{from: location }} replace/>
                : <Navigate to='/login' state={{from: location }} replace/>
    );
    
}

export default RequireAuth