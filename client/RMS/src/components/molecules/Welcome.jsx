import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../atom/Button'
function Welcome() {
  return (
    <div className='flex justify-center items-center h-[100vh] absolute top-0 w-full modal-wrapper'>
        <div className="w-1/3 bg-[#fff] rounded-xl text-white h-[200px] flex justify-center items-center flex-col">
            <p className='mb-3 text-lg text-black'>Sign Up Successful, Please login</p>
            <Link to={"/login"} >
                <Button className={"p-2 bg-[--blue-gray-3]"}>Login</Button>
            </Link>
        </div>
    </div>
  )
}

export default Welcome