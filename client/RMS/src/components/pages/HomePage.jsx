import React from 'react'
import DashboardTemplate from '../templates/dashboardTemplate'
import Button from '../atom/Button'
import useRefreshToken from '../../hooks/useRefreshToken'
function HomePage() {
  const refresh = useRefreshToken()
  const refreshHandler = (e)=>{
    e.preventDefault()
    refresh()
  }
  return (
    <DashboardTemplate>
        <main className=' bg-slate-200 md:w-4/5 p-5 h-[90vh] overflow-y-scroll'>
             <h1>Home</h1>
            <Button onClick={refreshHandler}>refresh</Button>
        </main>
    </DashboardTemplate>
  )
}

export default HomePage