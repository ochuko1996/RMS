import axios from "../api/axios"
import useAuth from "./useAuth"
function useRefreshToken() {
    const {setAuth, auth} = useAuth()
    const refresh = async()=> {
        const response = axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev)); 
            console.log(response.data);
            return {
                ...prev, 
                // accessToken: response.data.accessToken,
                // accessToken: response.data.accessToken,
            }
        })
        return response?.data?.accessToken
    }
  return refresh;
}

export default useRefreshToken