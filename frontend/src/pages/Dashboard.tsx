import React from 'react'
import { Outlet, useLocation } from 'react-router'


const Dashboard = () => {
    const location = useLocation()
  return (
    <div className=' p-5 overflow-y-scroll'>
        <h1 className=' text-btn-main text-2xl font-medium'>{location.pathname}</h1>
        <Outlet/>
    </div>

  )
}

export default Dashboard