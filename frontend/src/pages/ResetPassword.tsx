import React, { useState } from 'react'
import resetpass from '../assets/auth/resetpasword.png'
import apiConnector from '../apiConnector'
import { auth } from '../backendUrls/auth'
import toast from 'react-hot-toast'


const ResetPassword = () => {
  const [email, setEmail] = useState<string>()
  //handling click
  const handleReset = async () => {
    const bodyToSend = {
      email: email
    }
    const res = await apiConnector('POST', auth.resetPassword, JSON.stringify(bodyToSend), {'Content-Type': 'application/json'})
    if(res?.data?.success == true) {
      toast.success(res?.data?.message)
    }else{
      toast.error("Something went wrong")
    }
  }
  return (
    <div className=' h-screen flex justify-center gap-28 px-5 py-10'>
        <div className=' p-12'>
            <h1 className=' text-btn-main text-4xl font-medium'>RESET YOUR PASSWORD </h1>
            <p className=' text-btn-lmain'>Reset password, if you forgot your old passoword</p>
            <div className=' p-4 flex flex-col justify-center items-center'>
                <input className=' px-4 py-2 h-10 border-2 border-btn-main rounded-md m-10'
                type="email" placeholder='Enter Your Email'
                onChange={(e) => setEmail(e.target.value)} value={email}
                />
                <button className=' h-10 py-2 px-4 rounded-md bg-btn-main text-white w-2/3 hover:bg-blue-950'
                 onClick={handleReset}
                >Reset Password</button>
            </div>
        </div>

        <div>
            <img className=' h-[80vh]' src={resetpass} alt="reset password image" />
        </div>

    </div>
  )
}

export default ResetPassword