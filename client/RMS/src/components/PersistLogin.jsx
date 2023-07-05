import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken'
import useAuth from "../hooks/useAuth";

const PersistLogin = ()=> {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const {auth, persist} = useAuth()

    useEffect(()=>{
        const verifyRefreshToken = async ()=> {
            try {
                await refresh()
            } catch (error) {
                console.error(error)
            } finally{
                setIsLoading(false)
            }
        }
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
    },[])

    useEffect(()=> {
        console.log(`isLoading: ${isLoading}`)
        console.log(`isLoading: ${isLoading}`)
    }
    ,[isLoading])
    return (
        <>
            {
                !persist ? 
                    <Outlet/> :
                isLoading 
                    ?
                    <p>Loading...</p>
                    : <Outlet/>
            }
        </>
    )
}

export default PersistLogin