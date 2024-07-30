import  { useEffect, useState } from 'react'
import StepperComp from '../components/StepperComp'
import { AddQuestions } from '../components/AddQuestions'
import AddTopic from '../components/AddTopic'
import AddChap from '../components/AddChap'
import AddSubject from '../components/AddSubject'
import PubModule from '../components/PubModule'

const CreateModule = () => {
   const [curresntSteps, setCurrentSteps] = useState<any>(1)
   const [uploadedQuesId, setUploadedQuesId] = useState<string[]>([]);
   const [uploadedTopicId, setUploadedTopicId] = useState<string[]>([]);
   const [uploadedChap, setUploadedChap] = useState<string[]>([]);
   const [uploadedSub, setUploadedSub] = useState<string[]>([]);
   
   useEffect(()=>{
   },[uploadedTopicId, uploadedChap, uploadedSub])

  return (
  <section className=' p-5 w-full flex flex-col h-screen'>
      <div>
        <h1 className=' text-3xl font-medium text-btn-main'>CREATE MODULE</h1>
     </div>
     <div className=' mt-5 bg-gray-50 py-3 rounded-md'>
        <StepperComp {...curresntSteps}/>
     </div>
     <div className=' w-full flex justify-center'>
     {
      curresntSteps == 1 ? <AddQuestions setUploadedQuesId={setUploadedQuesId}/> :
      curresntSteps == 2 ? <AddTopic uploadedQuesId={uploadedQuesId} setUploadedTopicId={setUploadedTopicId}/> :
      curresntSteps == 3 ? <AddChap uploadedTopicId={uploadedTopicId} setUploadedChap={setUploadedChap} /> :
      curresntSteps == 4 ? <AddSubject uploadedChap={uploadedChap} setUploadedSub={setUploadedSub} /> :
      // @ts-ignore
      curresntSteps == 5 ? <PubModule uploadedSub={uploadedSub}/> : null
     }
     </div>
     <div className=' w-full flex justify-between p-8'>
        <button className=' py-2 px-4 rounded-md bg-btn-main text-white font-medium hover:bg-blue-950'
        onClick={()=> setCurrentSteps((prev: number) => prev-1)}
        >Back</button>
        <button className=' py-2 px-4 rounded-md bg-btn-main text-white font-medium hover:bg-blue-950'
         onClick={()=> setCurrentSteps((prev: number) => prev+1)}
        >Next</button>
     </div>
  </section>
)
}

export default CreateModule