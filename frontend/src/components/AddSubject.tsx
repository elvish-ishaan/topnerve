import { useState } from 'react'
import apiConnector from '../apiConnector';
import { course } from '../backendUrls/course';
import toast from 'react-hot-toast';
import LoadingSpinner from './LoadingSpinner';

//@ts-ignore
const AddSubject = ({uploadedChap, setUploadedSub}) => {
    const [Loading, setLoading] = useState<boolean>(false)
    const [subject, setSubject] = useState('');
    //handle add subject
    const addSubject = async () => {
        const bodyToSend = {
            title: subject,
            chapterId: uploadedChap

        }
        setLoading(true)
        const res: any = await apiConnector('POST', course.addSubject, bodyToSend, {'Content-Type': 'application/json'} )
        setLoading(false)
        if(res?.data?.success == true ){
          toast.success('Subject Added')
          setUploadedSub((prev: any)=> [
            ...prev,
            res?.data?.createdSubject?._id
        ])
        }else {
          toast.error('Something went wrong')
        }
    }
    
  return (
    <div className=' flex flex-col p-5'>
      {
        Loading ? <LoadingSpinner/> :
        <div>
           <label className=' dark:text-white p-2' htmlFor="subject">Subject Name</label>
           <input className=' py-2 rounded-md border-2 border-slate-600 px-4 w h-full ' type="text" name='chapter' value={subject} onChange={(e)=> setSubject(e.target.value)} />
            <button className=' rounded-md py-2 px-4 h-10 text-white my-4 bg-btn-main font-medium hover:bg-blue-950' onClick={addSubject}>add Subject</button>
   
        </div>
      } </div>
  )
}

export default AddSubject