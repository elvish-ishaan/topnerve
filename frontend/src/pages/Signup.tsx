import  { useState } from 'react'
import rocketLogo from '../assets/auth/launch.png'
import {  useDispatch } from 'react-redux'
import { setSignupData } from '../slices/auth';
import { useNavigate } from 'react-router';

const Signup = () => {
  const disptach = useDispatch();
  const navigate = useNavigate()
  //handling submmission
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  //handling change
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  //handling form
  const handleSubmit = (e: any) => {
    e.preventDefault();
    //dispatching aciton to signup
    disptach(setSignupData(formData))
    navigate('/otp-verification')
  }
  return (
    <div className=' flex justify-center h-screen'>
       <div className=' flex flex-col p-5 m-10 w-1/3'>
            <div className=' flex flex-col p-3'>
               <h1 className=' text-4xl font-medium text-btn-main tracking-wider'>Welcome To TopNerve</h1>
               <p className=' text-btn-lmain'>Where you will find you are looking for with ease.</p>
            </div>
            <div className=' flex flex-col p-5 gap-3'>
                <input className=' h-10 border-btn-main border-2 rounded-md px-4'
                onChange={handleChange}
                value={formData.name}
                 required type="text" name='name' placeholder='Name' />
                <input className=' h-10 border-btn-main border-2 rounded-md px-4'
                onChange={handleChange}
                value={formData.email}
                 required type="email" name='email' placeholder='example@email.com' />
                <input className=' h-10 border-btn-main border-2 rounded-md px-4'
                onChange={handleChange}
                value={formData.password}
                 required type="password" name='password' placeholder='Password' />
            </div>
            <div className=' p-5'>
                <button onClick={handleSubmit} className=' h-10 px-4 py-2 rounded-md font-medium bg-btn-main w-full text-white hover:bg-blue-950 shadow-md '>Sign Up</button>
            </div>
            <div>
                <p className=' relative top-2 z-10 text-center text-xs text-btn-lmain dark:text-white font-medium'>or using</p>
                <hr className=' dark:border-btn-lmain' />
             </div>
            <div className=' p-5'>
                 <button className=' h-10 w-full rounded-md border-btn-main border-2 dark:text-white'>Google</button>
             </div>
       </div>
       {/* //image */}
       <div className=' flex flex-col p-5 '>
           <h1 className=' text-3xl mt-16 font-medium text-center text-btn-lmain'>Unlock Exclusive Benefits, Join Our Community Today!</h1>
           <div className=' flex '>
           <img className='' src={rocketLogo} alt="launch logo" />
             <div className=' p-4 mt-24'>
                <p className=' dark:text-white'><span  className=' text-btn-main text-lg font-semibold'>Personalized Practice:</span> Tailored questions based on your strengths and weaknesses.</p>
                <p className=' dark:text-white'><span  className=' text-btn-main text-lg font-semibold'>Progress Tracking:</span> Monitor your performance and see improvement over time.</p>
                <p className=' dark:text-white'><span  className=' text-btn-main text-lg font-semibold'>Customizable Settings:</span> Adjust difficulty levels and preferences to suit your learning pace.</p>
                <p className=' dark:text-white'><span  className=' text-btn-main text-lg font-semibold'>Community Interaction:</span> Engage with a supportive community for tips and motivation.</p>
                <p className=' dark:text-white'><span  className=' text-btn-main text-lg font-semibold'>Competitive Edge:</span> Prepare effectively for exams and gain confidence in your knowledge.</p>

             </div>
           </div>
       </div>
    </div>
  )
}

export default Signup