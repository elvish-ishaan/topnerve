import { useEffect, useState } from 'react'
import apiConnector from '../apiConnector'
import { leaderboard } from '../backendUrls/leaderboard'
import profile from '../assets/testimonils/t1.png'
import { Avatar } from '@mui/material'
import one from '../assets/awards/one.png'
import two from '../assets/awards/two.png'
import three from '../assets/awards/three.png'
import LoadingSpinner from '../components/LoadingSpinner'



const Leaderboard = () => {
    const [rankers, setRankers] = useState<string[]>([])
    useEffect(()=> {
      const fetchRankers = async () => {
        const res: any = await apiConnector('GET', leaderboard.getRankers, {'Content-Type': 'application/json'})
        setRankers( (prev) => [...prev, res?.data?.rankers])
      }
      fetchRankers()
    },[])
  return (
    <section className=' w-full h-screen p-5'>
        <h1 className=' text-3xl text-btn-main font-medium'>LEADERBOARD</h1>
        <div className=' my-7 p-3 flex w-full gap-5'>
            <button className=' text-white bg-btn-main font-medium rounded-md py-2 px-4 hover:bg-blue-950'>Ranker</button>
            <button className=' text-white bg-btn-main font-medium rounded-md py-2 px-4 hover:bg-blue-950'>Consistent</button>
            <button className=' text-white bg-btn-main font-medium rounded-md py-2 px-4 hover:bg-blue-950'>Solver</button>
        </div>
        
        <section className=' px-10 overflow-y-scroll'>
            <div className=' flex justify-between text-2xl font-semibold dark:text-white'>
                <h1>Name</h1>
                <h1>Total Questions</h1>
                <h1>Badge</h1>
            </div>
            {
              rankers.length == 0 ? <LoadingSpinner/> : 
              <ul className=''>
            
           {
            rankers.map((ranker, index) => {
                return <li key={index} className=' flex justify-between my-5 border-2 border-btn-main rounded-md p-4 shadow-md align-middle'>
                            <div className=' flex align-middle items-center gap-3'>
                                { index === 0 && <img className=' size-10' src={one} alt="one" /> ||
                                index === 1 && <img className=' size-10' src={two} alt="two" />   ||
                                index === 2 && <img className=' size-10' src={three} alt="three" />
                                }
                              <Avatar alt="profile img" src={profile}
                              sx={{ width: 46, height: 46 }}
                              />
                              <h1 className=' text-xl dark:text-white font-medium'>{ranker}</h1>
                            </div>
                            <p className=' text-xl dark:text-white font-semibold'>50983</p>
                            <p className=' text-lg dark:text-white'>Hunger solver</p>
                       </li>
            })
           }
           </ul>
            }
        </section>
    </section>
  )
}

export default Leaderboard