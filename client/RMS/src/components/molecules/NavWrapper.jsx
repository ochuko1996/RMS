import React from 'react'
import Button from '../atom/Button'
import useAuth from '../../hooks/useAuth'
import { useSelector, useDispatch } from 'react-redux'
import { logOut, selectCurrentFirstname } from '../../store/api/authSlice'

function NavWrapper() {
  const firstName = useSelector(selectCurrentFirstname)
  const {auth} = useAuth()
  const dispatch = useDispatch()
  const logout = (e)=>{
    e.preventDefault()
    dispatch(logOut())
  }
  return (
    <div className='flex  w-[15%] justify-between text-white'>
      <h1 className='capitalize'>Welcome {firstName}</h1>
      <Button onClick={logout}>Log Out</Button>
    </div>
  )
}

export default NavWrapper