import axios from "../api/axios"
import useAuth from "./useAuth"
function useRefreshToken() {
    const {setAuth} = useAuth()
    const refresh = async()=> {
        const response = axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev)); 
            console.log(response.data.user.accessToken);
            return {...prev, accessToken: response.data.user.accessToken}
        })
        return response?.data?.user?.accessToken
    }
  return refresh;
}

export default useRefreshToken