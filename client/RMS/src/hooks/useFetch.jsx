import React,{useState, useEffect} from 'react'
import axios from '../api/axios'

function useFetch(url) {
    const [data, setData] = useState([])
    const fetchData = async()=>{
        const response = await axios.get(url, {
            headers: {'Content-Type': "application/json"},
            withCredentials: true
        })
        setData(response.data)
    }
    useEffect(()=>{
        fetchData()
    },[])
  return data
}

export default useFetch