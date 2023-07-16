import { useState } from 'react'
import Button from '../atom/Button'
import { useSelector, useDispatch } from 'react-redux'
import { logOut, selectCurrentFirstname } from '../../store/api/authSlice'
import { useLogoutQuery } from '../../store/features/authApiSlice'
import { useNavigate } from 'react-router-dom'

function NavWrapper() {
  const [skip, setSkip] = useState(true)
  const navigate = useNavigate()
  const firstName = useSelector(selectCurrentFirstname)
  const dispatch = useDispatch()
  // const signout = useLogoutQuery({skip: skip})
  
  const logout = async (e)=>{
    e.preventDefault()
    // if (skip === true) {
    //   await signout.refetch()
    // }
    dispatch(logOut())
    navigate('/login')
  }

  
  return (
    <div className='flex  w-[15%] justify-between text-white'>
      <h1 className='capitalize'>Welcome {firstName}</h1>
      <Button onClick={logout}>Log Out</Button>
    </div>
  )
}

export default NavWrapper