import React, { useEffect, useRef, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import apiConnector from '../apiConnector';
import { shcedule } from '../backendUrls/schedule';


const Schedules = () => {
    const [todos, setTodos] = useState<any[]>([{}])
    const inputRef = useRef(null)
    //hanldling add todo
    const hanldeAddTodo = (e: any)=> {
        const value = inputRef?.current?.value
        setTodos((prev) => [...prev, {
            task: value
        }]);
    }
    //clear input
    if (inputRef.current) {
        inputRef.current.value = '';
      }
    //handling delete 
    const handleDelete = ( id: number) => {
       setTodos( todos.filter((todo) => todo.id !== id))
    }
    //save to db
    useEffect(()=> {
        const updateSchedule =  async () => {
            const res = await apiConnector('POST', shcedule.createSchedule, todos, {'Content-Type': 'application/json'} )
            setTodos(res?.data?.todos)
        }
        updateSchedule()
    },[todos])
  return (
    <section className=' p-5 m-5 flex h-screen flex-col w-full'>
        <h1 className=' text-3xl font-medium text-btn-main'>SCHEDULE</h1>
        <div className=' p-4 w-full flex justify-center flex-col'>
             <div className=' m-5 flex justify-center w-full items-center gap-3'>
                <input ref={inputRef} className=' px-3 py-4 rounded-md border-btn-main border-2 placeholder:text-lg' type="text" placeholder='Add New Task' />
                <IoMdAdd className=' size-12 text-btn-lmain'
                 onClick={hanldeAddTodo}
                 />
             </div>
             <div className=' w-full'>
                <h1 className=' text-2xl text-btn-main font-medium'>Tasks</h1>
                <div className=' border-btn-lmain border-2 p-5 rounded-md'>
                    {
                        todos.length == 0 ? <p className=' text-lg font-semibold text-center'>No Tasks Yet!</p> :
                        <ol className=' flex flex-col gap-2'>
                            {
                                todos.map((todo: string) => { 
                                return <div className=' flex w-full justify-between'>
                                    <li key={todo.id}>{todo.task}</li> 
                                    <MdDelete className=' text-btn-main size-5 hover:text-blue-950'
                                      onClick={ () => handleDelete(todo.id)}
                                    />
                                </div> } )
                            }
                        </ol>
                    }
                </div>
             </div>
        </div>

    </section>
  )
}

export default Schedules