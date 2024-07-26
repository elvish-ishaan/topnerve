import React from 'react'
import { Router, Routes, Route } from 'react-router'
import Dashboard from '../pages/Dashboard'
import Analysis from '../pages/Analysis'
import Overview from '../pages/Overview'
import ExerciseEng from '../pages/ExerciseEng'
import UpdateProfile from '../pages/UpdateProfile'
import BuyModules from '../pages/BuyModules'
import ModuleDetails from '../pages/ModuleDetails'
import Checkout from '../pages/Checkout'
import MyModules from '../pages/MyModules'
import Practice from '../pages/Practice'
import Chapters from '../pages/Chapters'
import Topics from '../pages/Topics'
import Result from '../pages/Result'
import Leaderboard from '../pages/Leaderboard'
import Community from '../pages/Community'
import CreateModule from '../pages/CreateModule'
import PaymentSuccess from '../pages/PaymentSuccess'
import PaymentFailure from '../pages/PaymentFailed'
import CreateSchedule from '../pages/CreateSchedule'



const AllRoutes = () => {
  return (
        <Routes>
             <Route index path='/' element={<Overview/>}/>
             <Route path='/analysis' element={<Analysis/>}/>   
             <Route path='/exercise-engine/:questbankid' element={<ExerciseEng/>}/> 
             <Route path='/settings/update-profile' element={<UpdateProfile/>}/> 
             <Route path='/buy-modules' element={<BuyModules/>}/>
             <Route path='/buy-modules/:id' element={<ModuleDetails/>}/>
             <Route path='/buy-modules/:id/checkout' element={<Checkout/>}/>
             <Route path='/my-modules' element={<MyModules/>}/>
             <Route path='/my-modules/:id/practice' element={<Practice/>}/>
             <Route path='/practice/chapters/:id' element={<Chapters/>}/>
             <Route path='/practice/topics/:id' element={<Topics/>}/>
             <Route path='/practice/result/:id' element={<Result/>}/>  
             <Route path='/leaderboard' element={<Leaderboard/>}/> 
             <Route path='/create-module' element={<CreateModule/>}/>
             <Route path='/community' element={<Community/>}/>
             <Route path='/payment/success' element={<PaymentSuccess/>}/>    
             <Route path='/payment/failed' element={<PaymentFailure/>}/>
             <Route path='/schedules/add-schedule' element={<CreateSchedule/>}/>  
        </Routes >
    
  )
}

export default AllRoutes