import React, { useEffect } from 'react'
import tempback from '../assets/dashboard/tempback.png'
import { useSelector } from 'react-redux'
import Avatar, { genConfig } from 'react-nice-avatar'



const ProfileHeader = () => {
  const {user} = useSelector((state: any)=> state.auth)
   //genrate config for avater on first render
   let config = genConfig()
  return (
    <div className=' p-2 rounded-md bg-gray-100'>
        <img className=' rounded-md w-full h-1/3' src={tempback} alt="backgroud image" />
        <div className=' relative -top-10 z-10 flex items-center justify-center flex-col'>
            {
              user?.additionalDetails?.profile ? <img className=' rounded-full size-20 border-btn-main border-2'
               src={ user?.additionalDetails?.profile } alt="profile picture" /> :
               <Avatar className="size-20" {...config} />
            }
            <h1 className=' text-2xl font-bold text-btn-main'>{user?.name}</h1>
            <p>{user?.additionalDetails?.bio}</p>
            <div className=' text-start w-full text-lg text-btn-main m-2 p-2'>
                <h1 className=' font-semibold'>Medals</h1>
                <div className=' flex w-full p-2'>
                {
                  user?.milestones > 0 ? user?.milestones.map((badge: any) => {
                    return (
                     <div>
                         <img className=' size-20' src={badge.link} alt="badge" />
                         <p className=' text-center font-semibold text-lg'>{badge.name}</p>
                      </div>
                    )
                   }) : <p className=' text-center w-full text-sm'>No Badges Yet</p>
                }
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileHeader