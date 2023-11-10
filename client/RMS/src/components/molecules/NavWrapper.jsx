// import { useState } from 'react'
import Button from '../atom/Button'
import { useSelector, useDispatch } from 'react-redux'
import { logOut, selectCurrentFirstname } from '../../store/api/authSlice'
import { useLogoutMutation } from '../../store/features/authApiSlice'
import { useNavigate } from 'react-router-dom'

function NavWrapper() {
  // const [skip, setSkip] = useState(true)
  const navigate = useNavigate()
  const firstName = useSelector(selectCurrentFirstname)
  const dispatch = useDispatch()
  const [ logout] = useLogoutMutation()
  // const signout = useLogoutQuery({skip: skip})
  
  const logOutHandler = async (e)=>{
    e.preventDefault()
    // if (skip === true) {
    //   await signout.refetch()
    // }
    await logout()
    dispatch(logOut())
    navigate('/login')
  }

  
  return (
    <div className='flex  w-[15%] justify-between text-white'>
      <h1 className='capitalize'>Welcome {firstName}</h1>
      <Button onClick={logOutHandler}>Log Out</Button>
    </div>
  )
}

export default NavWrapper