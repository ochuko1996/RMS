import React from 'react'
import Button from '../atom/Button'
import useAuth from '../../hooks/useAuth'

function NavWrapper() {
  const {auth} = useAuth()
  const logout = (e)=>{
    e.preventDefault()
  }
  return (
    <div className='flex  w-[15%] justify-between text-white'>
      <h1 className='capitalize'>Welcome {auth?.firstName}</h1>
      <Button onClick={logout}>Log Out</Button>
    </div>
  )
}

export default NavWrapper