import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import apiConnector from '../apiConnector';
import { course } from '../backendUrls/course';

const Topics = () => {
  const param = useParams();
  const[topics, setTopics] = useState([])
  const navigate =  useNavigate()

  useEffect(()=>{
    const fetchChapters = async()=> {
      const res = await apiConnector('GET', course.getTopics + param.id, {'Content-Type': 'application/json'})
      setTopics(res?.data?.topics?.topics)
    }
    fetchChapters()
  },[])
  return (
    <section className=' h-screen p-8 w-full'>
      <h1 className=' text-btn-main text-3xl font-medium text-center'>Select Topic</h1>
      <div className=' p-5 mt-5'>
          <div className=' grid grid-cols-3 w-full'>
                {
                  topics.map((topic, index) => {
                    return (
                      <button key={index} className=' border-2 rounded-md py-3 px-4 shadow-md bg-slate-800 text-white text-2xl
                         hover:bg-slate-900 hover:scale-100'
                          onClick={()=> navigate(`/exercise-engine/${topic?._id}`) }>
                         <h1>{topic?.title}</h1>
                      </button>
                    )
                  })
                }
          </div>
      </div>

    </section>
  )
}

export default Topics