import React, { useEffect, useState } from 'react'
import apiConnector from '../apiConnector'
import { course } from '../backendUrls/course'
import LoadingButton from './LoadingButton'
import toast from 'react-hot-toast'

interface Question {
    question: string,
    optionOne: string,
    optionTwo: string,
    optionThree: string,
    optionFour: string,
    answer: string,
    explaination?: string
}

export const AddQuestions = ({ setUploadedQuesId }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [questionBag, setQuesionBag] = useState<any[]>([])
    const [question, setQuestion] = useState<any>({
        question: '',
        optionOne: '',
        optionTwo: '',
        optionThree: '',
        optionFour: '',
        answer: '',
        explaination: ''
    })    
    //handle change
    const hanldeChange = (e: any) => {
        setQuestion({
            ...question,
            [e.target.name]: e.target.value
        })
    }
    //hanlding adding quesitons
    const addQuestion =  (event: any) => {
        const newQuestion = {
            question: question.question,
            options: [question.optionOne, question.optionTwo, question.optionThree, question.optionFour],
            answer: question.answer,
            explaination: question.explaination
        }
        setQuesionBag([...questionBag, newQuestion])     
    }
    //handling to add all queestions
    const addAllQuestions = async (e: any) => {
        e.preventDefault()
        const bodyToSend = {
            questionBag
        }
        setLoading(true)
        const res = await apiConnector('POST', course.addQuestions, bodyToSend, {'Content-Type': 'application/json'}) 
        setLoading(false)
        if(res?.data?.success == true) {
            toast.success('Question Added')
            setUploadedQuesId(prevState => [
                ...prevState,
                res?.data?.createdAns?._id
            ]);
        }else{
            toast.error('Something Went Wrong')
        }
    }
  return (
    <div className=' flex flex-col gap-4 w-1/2'>
        <h1 className=' text-lg font-medium text-btn-main my-5'>Create Questions</h1>
           <label className=' dark:text-white text-lg' htmlFor="question">Question</label>
           <input className=' py-2 rounded-md border-2 border-slate-600 px-4 w h-full ' name='question' onChange={hanldeChange} value={question.question} type="text" placeholder='Type question' />
            <div className=' grid grid-cols-2 gap-3'>
            <input className=' px-4 py-2 rounded border-2 border-btn-main' onChange={hanldeChange} value={question.optionOne} name='optionOne' placeholder='option 1' type="text" />
            <input className=' px-4 py-2 rounded border-2 border-btn-main' onChange={hanldeChange} value={question.optionTwo} name='optionTwo' placeholder='option 2' type="text" />
            <input className=' px-4 py-2 rounded border-2 border-btn-main' onChange={hanldeChange} value={question.optionThree} name='optionThree' placeholder='option 3' type="text" />
            <input className=' px-4 py-2 rounded border-2 border-btn-main' onChange={hanldeChange} value={question.optionFour} name='optionFour' placeholder='option 4' type="text" />
            <input className=' px-4 py-2 rounded-md border-2 border-green-600' onChange={hanldeChange} value={question.answer} type="text" name='answer' placeholder='answer' />
            </div>
            {
                loading ? <LoadingButton/> :
                <div className=' flex gap-2 w-full justify-around'>
                    <button className=' rounded-md bg-btn-main text-white font-medium px-4 py-2 hover:bg-blue-950'
                        onClick={addQuestion}
                       >Add Question</button>
                       <button className=' rounded-md bg-btn-main text-white font-medium px-4 py-2 hover:bg-blue-950'
                        onClick={addAllQuestions}
                       >Submit</button>
                </div>
            
            }
     </div>
)
}
