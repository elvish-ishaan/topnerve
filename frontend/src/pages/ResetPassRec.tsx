import React, { useState } from 'react'
import ResetPass from '../assets/auth/resetpasword.png'
import apiConnector from '../apiConnector'
import { auth } from '../backendUrls/auth'
import { useNavigate, useParams } from 'react-router'
import toast from 'react-hot-toast'

const ResetPassRec = () => {
    const [password, setPassword] = useState<string>('')
    const param = useParams()
    const navigate = useNavigate()
    const handleClick = async () => {
        const bodyToSend = {
            token: param.token,
            updatedPassword: password,
        }
        const res = await apiConnector("POST", auth.resetPasswordAndToken, JSON.stringify(bodyToSend), {'Content-Type': 'application/json'})
        if(res?.data?.success == true ) {
            toast.success('Password Updated')
            navigate('/login')
        }else{
            toast.error('Something Went Wrong')
        }
    }
  return (
    <div className=' h-screen flex justify-center gap-28 px-5 py-10'>
        <div className=' p-12'>
            <h1 className=' text-btn-main text-4xl font-medium'>RESET YOUR PASSWORD </h1>
            <p className=' text-btn-lmain'>Reset password, if you forgot your old passoword</p>
            <div className=' p-4 flex flex-col justify-center items-center'>
                <input className=' px-4 py-2 h-10 border-2 border-btn-main rounded-md m-10'
                type="email" placeholder='Enter New Password'
                onChange={(e) => setPassword(e.target.value)} value={password}
                />
                <button className=' h-10 py-2 px-4 rounded-md bg-btn-main text-white w-2/3 hover:bg-blue-950'
                 onClick={handleClick}
                >Reset Password</button>
            </div>
        </div>

        <div>
            <img className=' h-[80vh]' src={ResetPass} alt="reset password image" />
        </div>

    </div>
  )
}

export default ResetPassRec