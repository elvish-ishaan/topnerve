import  { useEffect, useState } from 'react'
import Graph from '../components/Graph'
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import notFound from '../assets/dashboard/notFound.png'
import { useNavigate } from 'react-router';
import apiConnector from '../apiConnector';
import { overview } from '../backendUrls/overview';
import { useSelector } from 'react-redux';
import { MdOutlineTask } from "react-icons/md";
import { FaRegHandPointRight } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { IRootState } from '../Store';




const Overview = () => {
    const { user } = useSelector((state: IRootState) => state.auth)
    const [questionData, setQuestionData] = useState<number[]>([])
    const schData = localStorage.getItem('tp-tasks')
    // @ts-ignore  //fix it
    const schedules = JSON.parse(schData)
    const navigate = useNavigate()
    //get graph data
    useEffect(()=>{
     const fetchGraphData = async () => {
        const bodyToSend = {
         userId:user._id 
        }
        const res: any = await apiConnector("POST", overview.getGraphData, bodyToSend )
        console.log(res)
        setQuestionData(res?.data?.data)
     }
     fetchGraphData()
    },[])
    
  return (
    <div className=' h-screen p-8'>
         <div className=' flex gap-8'>
             <div>
                  {/* progress */}
                <div className=' p-4 flex flex-col justify-center border-2 border-btn-main rounded-md bg-gray-100'>
           <div className=' flex w-full justify-between'>
              <h1 className=' text-lg font-medium text-btn-main'>PROGRESS</h1>
              <div className="flex items-center gap-2 bg-btn-main text-white p-2 rounded-md">
                 <span className="flex items-center">
                   <BsCalendar2DateFill />
                 </span>
                 <select className="bg-btn-main text-white font-medium border-none outline-none cursor-pointer appearance-none">
                   <option value="weekly">Weekly</option>
                   <option value="monthly">Monthly</option>
                   <option value="yearly">Yearly</option>
                 </select>
                 <span className="flex items-center">
                   <FaChevronDown />
                 </span>
              </div>
           </div>
             <div className=' w-[700px] h-[300px]'>
             {
              //@ts-ignore
               questionData.length == 0 ? <p className=' text-center relative top-32 font-semibold'>No data Found</p> : <Graph noOfQuestions={questionData}/>
             }
             </div>
                </div>
                
             </div>

             <div className=' flex flex-col gap-4'>
                {/* quesion of day */}
                <div className=' p-4 flex flex-col justify-center border-2 border-btn-main rounded-md bg-slate-800'>
                  <div className=' flex justify-between w-full'>
                  <h1 className=' text-lg font-medium text-btn-main dark:text-white'>DAILY PRACTICE</h1>
                  <FaRegBookmark className=' dark:text-white size-6'/>
                  </div>
                  <div className=' p-4 '>
                     <p className=' font-semibold text-white'><span>Q: </span>Which is called power house of cell</p>
                      <div className=' grid grid-cols-2 gap-2 p-3'>
                        <p className=' border-2 border-btn-main rounded-md py-2 px-4 text-white'>Cell wall</p>
                        <p className=' border-2 border-btn-main rounded-md py-2 px-4 text-white'>cell membrane</p>
                        <p className=' border-2 border-btn-main rounded-md py-2 px-4 text-white'>mitochondria</p>
                        <p className=' border-2 border-btn-main rounded-md py-2 px-4 text-white'>nuclues</p>
                      </div>
                      <div className=' w-full flex justify-center'>
                         <button className=' bg-btn-main py-2 px-4 rounded-md text-white hover:bg-blue-950 w-[60%]'>Submit</button>
                      </div>
                  </div>
                </div>

                {/* upcomming schedules */}
                <div className='p-4 flex flex-col justify-center border-2 border-btn-main rounded-md bg-slate-900'>
                    <div className=' flex justify-between items-center'>
                       <h1 className=' text-lg text-btn-main font-medium dark:text-white'>UPCOMING SCHEDULES</h1>
                       <MdOutlineTask className=' dark:text-white size-6' />

                    </div>
                   {
                    // if there are shcdules render or show not found
                     schedules.length > 0 ? <div className=' py-2'>
                        {
                          schedules?.map((task: any) => <div className=' w-full flex justify-between px-4 py-2 items-center border-b border-btn-lmain'>
                            <FaRegHandPointRight className=' text-btn-main'/>
                            <span  className=' text-lg dark:text-white'>{task.name}</span>
                            <span className=' font-bold text-xl dark:text-white'>{task.time}</span>
                          </div> )
                        }
                        <div className=' w-full flex justify-center'>
                           <button className=' rounded-md px-2 py-1 h-10 text-white bg-btn-main my-6 self-center hover:bg-blue-950'
                            onClick={ () => navigate('/schedules/add-schedule')}
                           >Manage Schedules</button>
                        </div>
                     </div>: 
                     <div className=' flex flex-col justify-center items-center'>
                        <img className=' size-40' src={notFound} alt="not found logo" />
                        <p className=' text-btn-lmain text-center'>Oops, No Schedules Yet</p>
                        <button className=' rounded-md px-2 py-1 h-8 text-white bg-btn-main m-3 hover:bg-blue-950'
                         onClick={ () => navigate('/schedules/add-schedule')}
                        >Create One</button>
                     </div>
                   }
                <div>

                    </div>
                </div>
             </div> 
         </div>
    </div>
  )
}

export default Overview