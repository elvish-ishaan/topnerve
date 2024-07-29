import { useState } from 'react'
import './App.css'
import MainPage from './components/MainPage'
import Navbar from './components/Navbar'
import  Sidebar  from './components/Sidebar'
import Footer from './components/Footer' 
import AllRoutes from './components/AllRoutes'
import OpenRoutes from './components/OpenRoutes'
import { useSelector } from 'react-redux'
import './global.css';
import { Modal } from '@mui/material'
import apiConnector from './apiConnector'
import { auxillary } from './backendUrls/auxillary'
import toast from 'react-hot-toast'

function App() {
   const { token } = useSelector((state: any) => state.auth)      //fix any type
   const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
   const [isSuccessSubmit, setSuccessSubmit] = useState<boolean>(false)
   const theme = localStorage.getItem('tp-theme');
   if(theme) {
      document.documentElement.classList.add(theme)
   }
   const [data, setData] = useState({
      email: '',
      message: "",
   })
   //hanlde change
   const handleChange = (e: any)=> {
     setData({
      ...data,
      [e.target.name]: e.target.value
     })
   }
   //hanlding sending feedback
   const handleFeedback = async () => {
      const res = await apiConnector("POST", auxillary.feedback, data)
      console.log(res)
      if(res?.data?.success) {
         toast.success('Feedback Captured')
         setIsOpenModal(false)
      }else{
         toast.error('error in sending feedback')
      }
   }
  return (
 <div className=' dark:bg-dark-main'>
   <div className=' px-3 py-1 text-center w-full font-semibold
     bg-gradient-to-r  from-indigo-500 via-btn-main text-white'>
      <p>We are currently under testing phase, your feedback will help us to improve
          <span className=' text-orange-500 cursor-pointer ml-2'
           onClick={()=> setIsOpenModal(true)}
          >click here</span></p>
   </div>
    <div className=' flex flex-col'>
       <Navbar/>
    </div>
    <div className=' flex '>
        {token && <Sidebar />}
        {!token ? <MainPage /> && <OpenRoutes/> : <AllRoutes />}
    </div>
    <Footer/>
    {
      isOpenModal ? <Modal open={isOpenModal}
     > 
     <div className=' absolute top-1/3 left-1/4 p-5 bg-slate-900 flex flex-col  w-1/2 gap-4 rounded-sm'>
         <h1 className=' text-center text-xl text-white font-bold'>Feature Feedback</h1>
         <input type="email" name='email' placeholder='Your Email Address' className=' h-10 rounded px-4 py-2' 
          onChange={handleChange} value={data.email}
         />
        <input type="text" name='message' className=' h-10 rounded px-4 py-2' placeholder='What feature do you want, describe'
         onChange={handleChange} value={data.message}
        />
        <button className=' py-3 px-4 bg-btn-main font-medium text-white rounded-md hover:bg-blue-950 '
        onClick={handleFeedback}
        >Request Feature</button>
     </div>
     </Modal>
     : null
    }
 </div>

  )
}

export default App
