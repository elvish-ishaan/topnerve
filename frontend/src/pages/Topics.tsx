import  { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import apiConnector from '../apiConnector';
import { course } from '../backendUrls/course';
import LoadingSpinner from '../components/LoadingSpinner';
import { NavLink } from 'react-router-dom';

const Topics = () => {
  const param = useParams();
  const[topics, setTopics] = useState<any>([])
  const navigate =  useNavigate()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(()=>{
    const fetchChapters = async()=> {
      setLoading(true)
      const res:any = await apiConnector('GET', course.getTopics + param.id, {'Content-Type': 'application/json'})
      setLoading(false)
      setTopics(res?.data?.topics?.topics)
    }
    fetchChapters()
  },[])
  return (
    <section className=' h-screen p-8 w-full'>
      <h1 className=' text-btn-main text-3xl font-medium text-center'>Select Topic</h1>
      {
        loading ? <LoadingSpinner/> :
        <div className=' p-5 mt-5'>
          <div className=' grid grid-cols-3 gap-3 w-full'>
                {
                  topics.map((topic: any, index: number) => {
                    return (
                      <NavLink key={index} className=' border-2 rounded-md py-3 px-4 shadow-md bg-slate-800 text-white text-2xl
                         hover:bg-slate-900 hover:scale-100'
                          to={`/exercise-engine/${topic?._id}`}>
                         <h1>{topic?.title?.toUpperCase()}</h1>
                      </NavLink>
                    )
                  })
                }
          </div>
      </div>
      }

    </section>
  )
}

export default Topics