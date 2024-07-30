import { useState } from 'react'
import apiConnector from '../apiConnector'
import { course } from '../backendUrls/course'
import toast from 'react-hot-toast'
import LoadingButton from './LoadingButton'

//@ts-ignore
const AddTopic = ({uploadedQuesId, setUploadedTopicId}) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [topic, setTopic] = useState({
        title: '',
        discription: '',
        level: '',
        questionBankId: uploadedQuesId
    })
    //handle change
    const handleChange = (e: any) => {
        setTopic({
            ...topic,
            [e.target.name]: e.target.value
        })
    }
    //hanlde add topic
    const addTopic = async () => {
       setLoading(true)
        const res: any = await apiConnector('POST', course.addTopic, topic, {'Content-Type': 'application/json'})
        setLoading(false)
       if(res?.data?.success == true) {
        toast.success('Topic Added')
        setUploadedTopicId((prev: any) => [
          ...prev,
          res?.data?.createdTopic?._id
         ])
       }else{
        toast.error('Something Went Wrong')
       }
      }
  return (
    <div className='  p-4 flex flex-col gap-4'>
      <h1 className=' text-lg font-medium text-btn-main'>Create Topic</h1>
      <label className='dark:text-white' htmlFor="title">Title</label>
        <input className=' py-2 rounded-md border-2 border-slate-600 px-4 w h-full ' onChange={handleChange} value={topic.title} type="text" name='title' placeholder='Add Topic' />
        <label className='dark:text-white' htmlFor="discription">Discription</label> 
        <input className=' py-2 rounded-md border-2 border-slate-600 px-4 w h-full ' onChange={handleChange} value={topic.discription} type="text" name='discription' placeholder='discription' />
        <label className='dark:text-white' htmlFor="level">level</label> 
        <input className=' py-2 rounded-md border-2 border-slate-600 px-4 w h-full ' onChange={handleChange} type="text" value={topic.level} name='level' placeholder='level' />
        {
          loading ? <LoadingButton/> :
          <button className=' rounded-md py-2 px-4 h-10 text-white bg-btn-main font-medium hover:bg-blue-950' onClick={addTopic}>Add Topic</button>
        }
     </div>
  )
}

export default AddTopic