import  { useEffect, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import { useSelector } from 'react-redux'
import apiConnector from '../apiConnector'
import { course } from '../backendUrls/course'
import { AiOutlineLike } from 'react-icons/ai'
import thumbnail from '../assets/dashboard/tempback.png'
import notFound from '../assets/dashboard/notFound.png'

const MyModules = () => {
    const { user } = useSelector((state: any) => state.auth)
    const [modules, setModules] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(()=> {
         const fetchUser = async () => {
            setLoading(true)
            const res: any = await apiConnector('GET', course.getUserCourse + user._id, {'Content-Type': 'application/json'});
            setModules(res.data.courses)
            setLoading(false)
         }
         fetchUser()
    }, [])
  return (
    <section className=' h-screen p-10 w-full'>
          <h1 className=' text-btn-main text-3xl font-medium'>My Modules</h1>
          {
            loading ? <LoadingSpinner/> :
            <div className=' px-4'>
              {
                 modules.length > 0 ? <div className=' grid grid-cols-3'>
                   {
                    modules.map((module: any) => {
                      return (
                        <div className='max-w-sm mt-8 rounded-lg border-2 shadow-lg flex flex-col items-center bg-white dark:bg-gray-800 hover:shadow-2xl transition-shadow duration-300'>
                          <img className='w-full h-48 object-cover rounded-t-lg' src={thumbnail || module.courseTemp} alt="course thumbnail" />
                          <div className='flex flex-col items-center p-4'>
                            <h1 className='text-center text-2xl font-medium text-gray-800 dark:text-white mb-2'>{module.title}</h1>
                            <div className='flex flex-wrap justify-center gap-2 mb-3'>
                              {module.tags.map((tag: any) => (
                                <span className='bg-blue-500 rounded-full px-3 py-1 text-white text-sm transition-transform transform hover:scale-105' key={tag}>{tag}</span>
                              ))}
                            </div>
                            <div className='flex justify-between items-center w-full px-6 my-3'>
                              
                              <div className='flex items-center gap-1'>
                                <AiOutlineLike className='text-gray-800 dark:text-white' />
                                <p className='text-gray-800 dark:text-gray-300'>10.5K</p>
                              </div>
                            </div>
                            <a href={`/my-modules/${module._id}/practice`} className='w-full'>
                              <button className='w-full font-medium text-lg text-white rounded-md bg-blue-600 hover:bg-blue-700 py-2 px-4 transition-colors duration-300'>Practice</button>
                            </a>
                           </div>
                         </div>
                      )
                    })
                   }
                 </div>
                 : 
                 <div className=' h-screen flex flex-col items-center justify-center w-full'>
                    <img className=' self-center size-80' src={notFound} alt="not found jmg" />
                    <a href="/buy-modules">
                      <button className=' text-white font-medium rounded-md bg-btn-main py-2 px-4 hover:bg-blue-950'>Buy Now</button>
                    </a>
                 </div>
              }
          </div>
          }
          
    </section>
  )
}

export default MyModules