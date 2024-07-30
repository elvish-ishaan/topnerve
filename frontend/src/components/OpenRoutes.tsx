import { Routes, Route, Outlet } from 'react-router'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import MainPage from './MainPage'
import Otp from '../pages/Otp'
import ResetPassword from '../pages/ResetPassword'
import ResetPassRec from '../pages/ResetPassRec'
import AboutUs from '../pages/AboutUs'
import ContactUs from '../pages/ContactUs'
import NotFound from '../pages/NotFound'


const OpenRoutes = () => {
  return (
    <div>
        <Routes>
             <Route path='/' element={<MainPage/>}/>
             <Route path='/login' element={<Login/>}/>
             <Route path='/signup' element={<Signup/>}/>
             <Route path='/contact-us' element={<ContactUs/>}/>
             <Route path='/about-us' element={<AboutUs/>}/>
             <Route path='/otp-verification' element={<Otp/>}/>
             <Route path='/reset-password' element={<ResetPassword/>}/>
             <Route path='/reset-password/:token' element={<ResetPassRec/>}/>
             <Route path='*' element={<NotFound/>}/>
        </Routes >
        <Outlet/>
    </div>
  )
}

export default OpenRoutes