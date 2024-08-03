import { useState } from 'react';
import { navLinks } from '../constantData/navLinks'
import Switch from '@mui/material/Switch';
import logo from '../assets/logos/comLogo.png'
import { useSelector } from 'react-redux';
import flag from '../assets/New folder/india.png'
import {NavLink } from 'react-router-dom'

const Navbar = () => {
  const {token} = useSelector((state: any) => state.auth)
  //for switch
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  //handling dark modes
  const [isDark, setIsDark] = useState(true);
  if(isDark) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('tp-theme','dark')
  }else{
    document.documentElement.classList.remove('dark')
    localStorage.setItem('tp-theme', 'light')
  }
 
 setTimeout(() => {
    
 }, 6000);

  return (
    <nav className=' flex p-3 border-b-btn-main border-b-2 bg-transparent'>
        <div className=' flex justify-between w-full px-5'>
             <div className=' flex gap-14 align-baseline'>
                <div className=' flex gap-2 items-baseline '>
                   <img className=' size-8' src={logo} alt="banner" />
                   <p className=' relative top-0 font-medium tracking-wider
                    text-2xl self-center dark:text-white from-orange-400 via-white to-green-400'>NAFRI</p>
                    <img className=' size-4' src={flag} alt="indian flag" />
                </div>
                {/* rerturn navbar links if user logged out */}
                {
                  !token && <div className=' flex items-center gap-4 dark:text-white'>
                  {
                    navLinks.map((link, index) => {
                     return (
                        <NavLink className=' text-btn-main font-medium py-2 hover:border-b-2 hover:border-btn-main'
                         key={index} to={link.path}
                         >
                        {link.title}</NavLink>
                     )
                    })
                  }
                </div>
                }
                
             </div>
            
             <div className=' flex gap-5'>
                {
                  !token ? <div>
                      <NavLink to="/login"><button className=' p-2 rounded-lg font-medium text-btn-main border-2 border-btn-main hover:bg-slate-300'>Log In</button></NavLink>
                      <NavLink to="/signup"> <button className=' bg-btn-main p-2 rounded-lg font-medium text-white hover:bg-blue-900'>Sign Up</button></NavLink>
                  </div>
                  : 
                  null
                }
               <div>
                <Switch  onClick={()=> setIsDark(!isDark) }
                {...label}  />
                <p className=' font-medium text-xs dark:text-white'>
                  {
                    isDark ? 'Light Mode' : 'Dark Mode'
                  }
                </p>
                </div>

             </div>
        </div>
    </nav>
  )
}

export default Navbar