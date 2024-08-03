import  { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import apiConnector from '../apiConnector';
import { course } from '../backendUrls/course';
import LoadingSpinner from '../components/LoadingSpinner';
import { NavLink } from 'react-router-dom';

const Chapters = () => {
  const param = useParams();
  const[chapters,setChapters] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(()=>{
    const fetchChapters = async()=> {
      setLoading(true)
      const res: any = await apiConnector('GET', course.getChapters + param.id, {'Content-Type': 'application/json'})
      setLoading(false)
      setChapters(res?.data?.chapters?.chapterNames)
    }
    fetchChapters()
  },[])
  return (
    <section className=' h-screen p-8 w-full'>
      <h1 className=' text-btn-main text-3xl font-medium text-center'>Select Chapter</h1>
      {
        loading ? <LoadingSpinner/> :
        <div className=' p-5 mt-5'>
          <div className=' grid grid-cols-3 w-full'>
                {
                  chapters.map((chapter, index) => {
                    return (
                      <NavLink key={index} className=' border-2 rounded-md py-3 px-4 shadow-md bg-slate-800 text-white text-2xl
                         hover:bg-slate-900 hover:scale-100'
                          to={`/practice/topics/${chapter?._id}`}>
                         <h1>{chapter?.title}</h1>
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

export default Chapters