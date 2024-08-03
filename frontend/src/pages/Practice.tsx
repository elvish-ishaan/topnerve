import  { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import apiConnector from '../apiConnector'
import { course } from '../backendUrls/course'
import LoadingSpinner from '../components/LoadingSpinner'
import { NavLink } from 'react-router-dom'

const Practice = () => {
  const params = useParams()
  const [moduleData , setModuleData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchModuleData = async () => {
      setLoading(true)
      const res: any = await apiConnector('GET', course.getSpecCourse + params.id, {'Content-Type': 'application/json'}) 
      setLoading(false)
      setModuleData(res?.data?.subjects?.courseSubjects)
    }
    fetchModuleData()
  }, [])
  return (
    <section className=' h-screen p-8 w-full'>
      <h1 className=' text-btn-main text-3xl font-medium text-center'>Select Subject</h1>
      {
        loading ? <LoadingSpinner/> :
        <div className=' p-5 mt-5'>
          <div className=' grid grid-cols-3 w-full'>
                {
                  moduleData?.map((chapter, index) => {
                    return (
                      <NavLink key={index} className=' border-2 rounded-md py-3 px-4 shadow-md bg-slate-800 text-white text-2xl
                         hover:bg-slate-900 hover:scale-100'
                          to={`/practice/chapters/${chapter?._id}`}>
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

export default Practice