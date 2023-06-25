import { useLocation, Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const RequireAuth = ({children})=> {
    const {auth} = useAuth()
    const location = useLocation()

    // return (
    //     auth?.user
    //         ? <Outlet/>
    //         : <Navigate to='/login' state={{from: location }} replace/>
    // );
    // if (auth?.user) {
    //     return <Navigate to='/login' state={{from: location}} replace />
    // }
    // return children
}

export default RequireAuth