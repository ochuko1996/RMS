import React from 'react'
import Button from '../atom/Button'

function NavWrapper() {
  return (
    <div className='flex  w-[15%] justify-between text-white'>
      <h1>Welcome Ochuko</h1>
      <Button>Log Out</Button>
    </div>
  )
}

export default NavWrapper