import { useState } from 'react'
import loginLogo from '../assets/auth/login.png'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../asyncActions/auth'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
const Login = () => {
   const { token, error } = useSelector((state: any) => state.auth)   //fix type
   const navigate = useNavigate()
   const disptach = useDispatch()
   const [formData, setFormData] = useState({
      email: '',
      password: ''
   })
   //handling chnage
   const handleChange = (e: any) => {   //fix any type
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      })
   };
   //handling submit
   const handleSubmit = () => {
      disptach(login(formData))
   };
   //if login success navigate user to home
   if( token ) {
      toast.success('Logged In')
      navigate('/')
   }
   if( error) {
      toast.error(error)
   }
   

  return (
    <div className=' h-screen p-4 w-[95vw] '>
        <div className=' flex justify-between p-4 gap-10 w-full '>
           <div className=' p-10 w-[30%] '>
               <h2 className=' font-bold text-3xl dark:text-white'>Welcom Back! 👋</h2>
               <p className=' text-btn-lmain'>Log in to continue where you left</p>
                <div className=' flex flex-col m-8 gap-3 w-full'>
                   <input className=' h-10 p-2 border-btn-main border-2 rounded-md w-full'
                   value={formData.email} onChange={handleChange}
                   type="email" name="email" id="" placeholder='example@email.com' />
                   <input className=' h-10 p-2 border-btn-main border-2 rounded-md w-full'
                   value={formData.password} onChange={handleChange}
                    type="password" name='password' placeholder='password' />
                    <a className=' text-black self-end text-xs dark:text-white' href="/reset-password">Forget Password?</a>
                    <div>
                       <button onClick={handleSubmit} className=' bg-btn-main h-10 w-full py-2 rounded-md text-white font-medium shadow-md hover:bg-blue-950'>Log In</button>
                    </div>
                    <div>
                      <p className=' relative top-2 z-10 text-center text-xs text-btn-lmain dark:text-white font-medium'>or using</p>
                      <hr className=' dark:border-btn-lmain' />
                   </div>
                   <div className=' p-3'>
                     <button className=' h-10 w-full rounded-md border-btn-main border-2 dark:text-white'>Google</button>
                   </div>
                    <div className=' w-full text-center'>
                       <a className=' text-btn-main dark:text-btn-lmain' href="/signup">or create a new one here</a>
                    </div>

                </div>
                
           </div>

           <div className='flex flex-col bg-blue-950 rounded-md px-8 py-2 '>
               
                  <img src={loginLogo} alt="login image" />
                  <h1 className=' text-3xl font-medium text-center text-white'>Log In To Hustle</h1>
                  <p className=' text-btn-lmain'>Hustle to get most of your prepration and at end celebrate you success</p>
           </div>
           
        </div>
    </div>
  )
}

export default Login