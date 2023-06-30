import axios from 'axios'
const BASE_URL = "http://localhost:4500/api"
export default axios.create({
    baseURL: BASE_URL
})
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type": "application/json"},
    withCredentials: true
})