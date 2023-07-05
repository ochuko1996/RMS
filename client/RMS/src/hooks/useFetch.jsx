import React,{useState, useEffect} from 'react'
import axios, { axiosPrivate } from '../api/axios'
import useAuth from './useAuth'

function useFetch(url, auth) {
    const [data, setData] = useState([])
    const fetchData = async()=>{
        axios.interceptors.request.use((config)=>{
            // const auth = useAuth();
            console.log(auth.accessToken);
            const token = auth.accessToken
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        })
        const response = await axios.get(url, {
            headers: {'Content-Type': "application/json"},
            withCredentials: true,
        })
        setData(response.data)
    }
    useEffect(()=>{
        fetchData()
    },[])
  return data
}

export default useFetch