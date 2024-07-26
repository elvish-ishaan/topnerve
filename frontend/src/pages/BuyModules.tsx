import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import apiConnector from '../apiConnector';
import { course } from '../backendUrls/course';
import ModuleCard from '../components/ModuleCard';
import toast from 'react-hot-toast';
import { Modal, Skeleton } from '@mui/material';
import { auxillary } from '../backendUrls/auxillary';
import LoadingButton from '../components/LoadingButton';
import successTick from '../assets/mainPage/successTick.png'

const BuyModules = () => {
  const [courses, setCoursesData] = useState([]);
  const [openModal, setOpenModal] = useState<boolean>(false)
  
  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const loadToast = toast.loading('Loading')
        const res: any = await apiConnector('GET', course.getAllCourse, { 'Content-Type': 'application/json' });
        toast.dismiss(loadToast)
        setCoursesData(res.data.courses);
      } catch (error) {
        
      }
    };
    fetchAllCourses();
  }, []);
  const [loading, setLoading] = useState<boolean>(false)
  const [mobile, setMobile] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
 //handling talk to expert
 const handleExpertTalk = async (e: any) => {
  e.preventDefault()
  //validation check
  if (name.length === 0 || mobile.length < 10) {
    toast.error('Provide Valid Details');
    return;
  }
  const bodyToSend = {
    name,
    mobile
  }
  setLoading(true)
  const res = await apiConnector('POST', auxillary.postTalkExport, bodyToSend )
  setLoading(false)
  if(res?.data?.success){
    toast.success('Details Send')
    setShowSuccess(true)
  }else{
    toast.error('Something Went Wrong')
  }
 }
  return (
    <section className='p-6 w-full h-screen overflow-scroll'>
      <div className='border-2 border-x-0 border-t-0 px-4 py-2 border-b-btn-main flex justify-between items-end w-full'>
        <div className='text-2xl font-medium dark:text-white'>Buy Modules</div>
        <div className='flex gap-3'>
          <NavLink to="/buy-modules"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "bg-btn-main rounded-md px-4 py-2 text-white" : ""
            }
          >Individual</NavLink>
          <NavLink to="/buy-modules"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "bg-btn-main rounded-md px-4 py-2 text-white" : ""
            }
          >Bundles</NavLink>
        </div>
        <div>
          <button className='h-12 px-4 py-2 rounded-md bg-btn-main text-white font-medium hover:bg-blue-950'
          onClick={() => setOpenModal(true)}
          >Talk To Experts</button>
        </div>
      </div>
        {
          courses.length > 0 ? <div className=' p-4 grid grid-cols-3 gap-3'>
                                  {
                                    //@ts-ignore
                                  courses?.map((course, index) => <ModuleCard {...course}/>)
                                  }
                               </div>
                               :
                              <div className=' p-10'>
                                 <Skeleton variant="rounded" animation="wave" width={290} height={318} />
                              </div>
        }
         <Modal className="flex items-center justify-center"
            open={openModal}>
              {
                showSuccess ? <div className='bg-slate-900 rounded-md p-5 flex flex-col justify-center text-center gap-3 dark:text-white'>
                   <h1 className=' text-3xl font-medium text-green-600'>Success</h1>
                   <p>Your Query Has Been Send Successfully</p>
                   <p>Our Export Team Will Contact You Shortly</p>
                   <img className=' size-20 self-center' src={successTick} alt="tick png" />
                   <button className=' mx-16 py-2 px-4 w-full text-white font-medium rounded-md bg-btn-main self-center my-4 hover:bg-blue-950'
                   onClick={()=> setOpenModal(false)}
                   >
                    Okay
                   </button>
                </div> :

                <form className=' bg-slate-900 rounded-md'>
                  <span className=' relative left-[500px] top-2 text-4xl font-semibold shadow-lg text-btn-main cursor-pointer'
                  onClick={()=> setOpenModal(false)}
                  >X</span>
                <div className=' p-5'>
                   <p className=' text-lg dark:text-white'>Provide your contact number so that our expert can talk to you.</p>
                </div>
                 <div className=' flex flex-col p-2 gap-5'>
                 <input className=' px-4 py-2 rounded border-2 mx-20 border-btn-main' type="text" name='name'
                    onChange={(e)=> setName(e?.target?.value)}
                   placeholder='Enter Your Name' />
                   <input className=' px-4 py-2 rounded border-2 mx-20 border-btn-main' type="text" name='mobile'
                    onChange={(e)=> setMobile(e?.target?.value)}
                   placeholder='Enter Contact Number' />
                   {
                    loading ? <LoadingButton/> :
                    <button className=' mx-16 py-2 px-4 w-full text-white font-medium rounded-md bg-btn-main self-center my-4 hover:bg-blue-950'
                    onClick={handleExpertTalk}
                   >Submit</button>
                   }
                 </div>
              </form>
              }
         </Modal>
    </section>
   
  );
}

export default BuyModules;
