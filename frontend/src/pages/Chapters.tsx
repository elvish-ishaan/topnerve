import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import apiConnector from '../apiConnector';
import { course } from '../backendUrls/course';

const Chapters = () => {
  const param = useParams();
  const navigate = useNavigate()
  const[chapters,setChapters] = useState([])
  useEffect(()=>{
    const fetchChapters = async()=> {
      const res = await apiConnector('GET', course.getChapters + param.id, {'Content-Type': 'application/json'})
      setChapters(res?.data?.chapters?.chapterNames)
    }
    fetchChapters()
  },[])
  return (
    <section className=' h-screen p-8 w-full'>
      <h1 className=' text-btn-main text-3xl font-medium text-center'>Select Chapter</h1>
      <div className=' p-5 mt-5'>
          <div className=' grid grid-cols-3 w-full'>
                {
                  chapters.map((chapter, index) => {
                    return (
                      <button key={index} className=' border-2 rounded-md py-3 px-4 shadow-md bg-slate-800 text-white text-2xl
                         hover:bg-slate-900 hover:scale-100'
                          onClick={()=> navigate(`/practice/topics/${chapter?._id}`) }>
                         <h1>{chapter?.title}</h1>
                      </button>
                    )
                  })
                }
          </div>
      </div>

    </section>
  )
}

export default Chapters