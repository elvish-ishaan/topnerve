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

function App() {
   const { token } = useSelector((state: any) => state.auth)      //fix any type
   const theme = localStorage.getItem('tp-theme');
   if(theme) {
      document.documentElement.classList.add(theme)
   }
  return (
 <div className=' dark:bg-dark-main'>
   <div className=' px-3 py-1 text-center w-full font-semibold
     bg-gradient-to-r  from-indigo-500 via-btn-main text-white'>
      <p>We are currently under testing phase, your feedback will help us to improve.</p>
   </div>
    <div className=' flex flex-col'>
       <Navbar/>
    </div>
    <div className=' flex '>
        {token && <Sidebar />}
        {!token ? <MainPage /> && <OpenRoutes/> : <AllRoutes />}
    </div>
    <Footer/>
 </div>

  )
}

export default App
