import React, { useEffect, useState } from 'react'
import apiConnector from '../apiConnector'
import { course } from '../backendUrls/course'
import { useNavigate, useParams } from 'react-router'
import thumnailTemp  from '../assets/dashboard/Screenshot 2024-06-28 141015.png'
import { FaShareFromSquare } from "react-icons/fa6";
import { Rating } from '@mui/material'
import LoadingSpinner from '../components/LoadingSpinner'
import { FaCartPlus } from "react-icons/fa";





const ModuleDetails = () => {
    const params = useParams()
    const [ModuleDetails, setModuleDetails] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(()=> {
        const fetchModuleData = async () => {
            setLoading(true)
            const res = await apiConnector('GET', course.getCourseWithId + `${params.id}`, {'Content-Type': 'application/json'})
            setLoading(false)
            setModuleDetails(res?.data?.courseDetails)
        }
        fetchModuleData()
    },[])
  return (
    <div>
      {
        loading ? <LoadingSpinner/> :
        <div>
      <div className=' flex flex-col bg-slate-900  rounded-md p-2 absolute top-40 right-5'>
        <img src={thumnailTemp} className=' h-1/2 rounded-md w-1/2' alt="module thumbnail" />
        <p className=' text-3xl font-semibold p-2 text-white'>Rs. {ModuleDetails?.price}</p>
        <a className=' rounded-md px-4 py-2 bg-btn-main text-center font-medium text-white m-2 hover:bg-blue-950'>
        <button className=' w-1/2' onClick={()=> navigate(`/buy-modules/${params.id}/checkout`)}>
          Buy Now
        </button>
        </a>
        <button className=' rounded-md px-4 py-2 bg-slate-800 font-medium text-white m-2 hover:bg-slate-900 flex gap-3 justify-center items-center'>
          <FaCartPlus/>
          <span>Add To Cart</span>
        </button>
        <p className=' text-btn-lmain text-center gap-y-3'>7-Day Money-Back Guarantee</p>
        <div className=' text-center text-btn-main flex items-center gap-2 justify-center my-2'>
           <FaShareFromSquare />
           <a>share</a>
        </div>
      </div>
      <div className=' py-16 px-10'>
         <div className=' w-1/2'>
           <h1 className=' text-4xl font-semibold dark:text-white'>{ModuleDetails?.title}</h1>
           <h2 className=' text-lg text-btn-lmain my-5'>{ModuleDetails?.discripton}</h2>
           <div className=' flex gap-3'>
             {
              ModuleDetails?.tags?.map((tag: string, index: number) => {
                return <span className=' text-white bg-btn-main my-1 font-medium rounded-md py-2
                 px-3' key={index}>{tag}</span>
              })
             }
           </div>
           <div className=' flex items-center p-3'>
           <Rating name="read-only" value={4} readOnly /> 
           <p className=' text-lg dark:text-white'> {ModuleDetails?.enrolledUsers?.length} students enrolled</p>
           </div>
           {/* <p className=' text-xl dark:text-white my-2'>Author:</p> */}
           {/* <div className=' flex items-center text-lg gap-2'>
           <IoIosInformationCircleOutline className=' dark:text-white' />
           <p className=' dark:text-white'>Created at: { Date.now().toLocaleString('en-IN') }</p>
           </div> */}

         </div>
         <div className=' p-3 ml-10 bg-slate-800 rounded-md shadow-md mt-5 w-1/2 flex justify-center'>
          <h1 className=' text-lg font-semibold dark:text-white  text-white'>Module Overview</h1>
         </div>
         <div className=' px-10 py-4  w-1/2'>
             <details>
             {
              //fix: show the module datials in drop down fashion
              ModuleDetails?.courseSubjects?.map( (sub: any) => <summary className=' font-medium bg-btn-main py-2 px-4 text-white rounded-md'>{sub.title}</summary> )
             }
             </details>
          </div>
      </div>
      </div> 
      }
    </div>
  )
  
}

export default ModuleDetails