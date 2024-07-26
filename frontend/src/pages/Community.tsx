import React from 'react'
import commingSoon from '../assets/dashboard/comming.png'

const Community = () => {
  return (
    <section className=' h-screen w-full flex flex-col justify-center align-middle items-center'>
           <h1 className=' text-3xl font-medium dark:text-white'>Comming soon!</h1>
           <img className=' size-80' src={commingSoon} alt="commming soon" />
    </section>
  )
}

export default Community