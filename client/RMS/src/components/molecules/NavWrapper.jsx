import React from 'react'
import Button from '../atom/Button'
import useAuth from '../../hooks/useAuth'
import { useSelector } from 'react-redux'
import { selectCurrentFirstname } from '../../store/api/authSlice'

function NavWrapper() {
  const firstName = useSelector(selectCurrentFirstname)
  const {auth} = useAuth()
  const logout = (e)=>{
    e.preventDefault()
  }
  return (
    <div className='flex  w-[15%] justify-between text-white'>
      <h1 className='capitalize'>Welcome {firstName}</h1>
      <Button onClick={logout}>Log Out</Button>
    </div>
  )
}

export default NavWrapper