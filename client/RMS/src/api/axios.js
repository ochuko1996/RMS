import axios from 'axios'
import useAuth from '../hooks/useAuth'
const BASE_URL = "http://localhost:4500/api"
export default axios.create({
    baseURL: BASE_URL
})
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type": "application/json"},
    withCredentials: true
})
// axiosPrivate.interceptors.request.use((config)=> {
//     const auth = useAuth()
//     if (auth) {
//         config.headers.Authorization = `Bearers ${auth.accessToken}`
//     }
// })