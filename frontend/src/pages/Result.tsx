import React, { useEffect, useState } from 'react'
import apiConnector from '../apiConnector'
import { useParams } from 'react-router'
import award from '../assets/dashboard/award.png'
import { test } from '../backendUrls/test'
import LoadingSpinner from '../components/LoadingSpinner'

const Result = () => {
    const params = useParams()
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(()=> {
        const fetchResult = async () => {
            setLoading(true)
            const res = await apiConnector('GET', test.getTest + params.id, {'Content-Type': 'application/json'} )
            setLoading(false)
            setResult(res?.data?.test)
        }
        fetchResult()
    },[])
  return (
    <section className=' p-5 my-3 flex flex-col w-full'>
        <h1 className=' text-btn-main font-medium text-3xl px-2'>PERFORMANCE</h1>
        {
            loading ? <LoadingSpinner/> :
            <div className=' flex flex-col mt-8 w-full justify-center'>
           <div className=' flex flex-col w-full justify-center items-center'>
              <img className=' size-40' src={award} alt="award" />
              <div className=' text-white p-4 flex flex-col justify-center'>
                <h1 className=' text-2xl font-medium'>Total Score</h1>  
                <p className=' text-center text-5xl py-2'>{result?.score}</p>
              </div> 
              <h1 className=' text-xl font-medium text-btn-lmain'>Hurray, You Did It</h1>   
            </div>
                <div className=' mt-2 flex justify-center '>
                    <table className=' border-2 border-btn-main'>
                        <thead>
                            <tr>
                                {/* <th className=' px-4 py-2 dark:text-white font-medium text-lg'>Questions</th> */}
                                <th className=' px-4 py-2 dark:text-white font-medium text-lg'>Time</th>
                                <th className=' px-4 py-2 dark:text-white font-medium text-lg'>Total Time Spend</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/* <td className=' px-4 py-8 border-slate-400 text-btn-lmain'> 8</td> */}
                                <td className=' px-4 py-8 border-slate-400 text-btn-lmain'>{result?.avgTime}</td>
                                <td className=' px-4 py-8 border-slate-400 text-btn-lmain'>{result?.totalTime}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className=' flex justify-center'>
                <button className=' my-5 rounded-md bg-btn-main text-white font-medium py-2 px-4 hover:bg-blue-950'>Practice It Again</button>
                </div>
        </div>
        }
    </section>
  )
}

export default Result