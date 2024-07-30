import { useState } from 'react'
import apiConnector from '../apiConnector'
import { course } from '../backendUrls/course'
import toast from 'react-hot-toast'
import LoadingButton from './LoadingButton'


const PubModule = ({uploadedSub}: {
    uploadedSub: string
}) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [module, setModule] = useState({
        title: '',
        description: '',
        tags: ["good", "light"],
        price: '',
        courseSubId: uploadedSub
    })
  //handling change
 const handleChange = (e: any) => {
    setModule({
        ...module,
        [e.target.name]: e.target.value
    })
 }
 //publish course
 const Publish = async () => {
    setLoading(true)
    const res: any = await apiConnector('POST', course.createCourse, module, {'Content-Type': 'application/json'})
    setLoading(false)
    if(res?.data?.success == true) {
      toast.success('Module Published')
    }else{
      toast.error('Something went wrong')
    }
 }
  return (
    <div className=' p-5 mt-5 flex flex-col gap-3'>
         <label className=' dark:text-white p-2' htmlFor="title">Title</label>
         <input className=' py-2 rounded-md border-2 border-slate-600 px-4 w h-full ' type="text" name='title' value={module.title} onChange={handleChange}  />
         <label className=' dark:text-white p-2' htmlFor="description">Description</label>
         <input className=' py-2 rounded-md border-2 border-slate-600 px-4 w h-full ' type="text" name='description' value={module.description} onChange={handleChange} />
         <label className=' dark:text-white p-2' htmlFor="price">Price</label>
         <input className=' py-2 rounded-md border-2 border-slate-600 px-4 w h-full ' type="number" name='price' value={module.price} onChange={handleChange} />
        {
          loading ? <LoadingButton/> :
          <button className=' rounded-md py-2 px-4 h-10 text-white my-4 bg-btn-main font-medium hover:bg-blue-950' onClick={Publish}>Publish</button>
        }
    </div>
  )
}

export default PubModule