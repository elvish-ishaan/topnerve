import React, { useState } from 'react'
import apiConnector from '../apiConnector'
import { course } from '../backendUrls/course'
import toast from 'react-hot-toast'

const AddChap = ({uploadedTopicId, setUploadedChap}) => {
    const [loading, setLoading] = useState<boolean>(false)
    //handlechange
    const [title, setTitle] = useState('')
    //adding chapter
    const bodyToSend = {
        title: title,
        topicId: uploadedTopicId
    }
    const addChapter = async () => {
        setLoading(true)
        const res = await apiConnector("POST", course.addChapter, bodyToSend, {'Content-Type': 'application/json'} )
        setLoading(false)
        if(res?.data?.success == true) {
            toast.success('Chapter Added')
            setUploadedChap(prev => [
                ...prev,
                res?.data?.createdChap?._id
            ])
        }else{
            toast.error('Something Went Wrong')
        }
    }

  return (
    <div className=' mt-10 flex p-5 flex-col'>
        <label className=' dark:text-white p-2' htmlFor="chapter">Chapter Name</label>
        <input  className=' py-2 rounded-md border-2 border-slate-600 px-4 w h-full ' type="text" name='title' value={title} onChange={(e)=> setTitle(e.target.value)} />
        <button className=' rounded-md py-2 px-4 h-10 text-white my-4 bg-btn-main font-medium hover:bg-blue-950' onClick={addChapter}>Add chapter</button>
    </div>
  )
}

export default AddChap