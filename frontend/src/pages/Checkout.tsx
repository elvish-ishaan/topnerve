import  { useEffect, useState } from 'react'
import apiConnector from '../apiConnector'
import { course } from '../backendUrls/course'
import { useParams } from 'react-router'
import { payment } from '../backendUrls/payment'
import { useSelector } from 'react-redux'


const Checkout = () => {
    const { user } = useSelector((state: any ) => state.auth)
    const params = useParams()
    const [ModuleDetails, setModuleDetails] = useState<any>(null)

    useEffect(()=> {
        const fetchModuleData = async () => {
            const res:any = await apiConnector('GET', course.getCourseWithId + `${params.id}`, {'Content-Type': 'application/json'})
            setModuleDetails(res?.data?.courseDetails)
        }
        fetchModuleData()
    },[])
    const body = {
        courseId: ModuleDetails?._id,
        userId: user._id
    }
    const handleCheckout = async () => {
        const orderRes: any = await apiConnector('POST', payment.checkout,body, {'Content-Type': 'application/json'} )
        const order = await orderRes?.data?.genOrder
        //handling payment
    const options = {
        key: "rzp_test_BKmS1RxiwyDbzS",               //fix this before production
        amount: order?.amount ,
        currency: order?.currency,
        name: "Top Nerve",
        description: "Top Nerve Transaction",
        image: '',
        order_id: order?.id,
        callback_url: "http://localhost:3000/api/v1/payment/payment-varification",
        prefill: {
          name: `${user?.name}`,
          email: `${user?.email}`,
        },
        notes: {
          userid: user._id,
          courseid: ModuleDetails._id
        },
        theme: {
          color: "#2563EB",
        },
      };
    const rzp1 = (window as any).Razorpay(options)
    rzp1.open();
    }
    

  return (
   <div className=' h-screen w-screen flex justify-center'>
      <div className=' self-center rounded-md dark:bg-slate-900 shadow-sm bg-gray-100 w-1/2'>
          <h1 className=' text-center font-medium text-3xl text-btn-main tracking-wider my-2'>CHECKOUT</h1>
          <div className=' p-6'>
              <h1 className=' text-xl font-semibold dark:text-white'>{ModuleDetails?.title}</h1>
              <p className=' text-btn-lmain'>{ModuleDetails?._id}</p>
              <div className=' grid grid-cols-2 border-2 p-3 my-4'>
                 <span className=' dark:text-white'>Amount:</span> <span className=' text-2xl text-green-600 font-bold'>{ModuleDetails?.price}</span>
                 <span className=' text-btn-lmain'>Include Taxes</span> <span>0.00</span>
                 <span className=' text-btn-lmain'>GST Tax</span> <span>0.00</span>
                 <hr className=' my-4' /> <hr className=' my-4' />
                 <span className=' text-btn-lmain'>Sum Total</span> <span className=' text-3xl dark:text-white'>{ModuleDetails?.price}</span>
              </div>
          </div>
          <div className=' w-full flex justify-center'>
            <button onClick={ handleCheckout } className=' py-2 px-4 text-white font-medium rounded-md bg-btn-main self-center my-4 hover:bg-blue-950'>Pay Now</button>
          </div> 
      </div>
   </div>
  )
}

export default Checkout