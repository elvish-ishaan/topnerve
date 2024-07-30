import React, {  useRef, useState, } from 'react';
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";

interface Todo {
    id: number,
    name: string,
    time?: string
}

const Schedules: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    // Handling add todo
    const handleAddTodo = (): void => {
        const value = inputRef?.current?.value;
        if (value) {
            setTodos((prev) => [
                ...prev, 
                {
                    id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
                    name: value,
                    time: new Date().toLocaleTimeString() 
                }
            ]);
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        }
    };

    // Handling delete
    const handleDelete = (id: number): void => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <section className='p-5 m-5 flex h-screen flex-col w-full'>
            <h1 className='text-3xl font-medium text-btn-main'>SCHEDULE</h1>
            <div className='p-4 w-full flex justify-center flex-col'>
                <div className='m-5 flex justify-center w-full items-center gap-3'>
                    <input ref={inputRef} className='px-3 py-4 rounded-md border-btn-main border-2 placeholder:text-lg' type="text" placeholder='Add New Task' />
                    <IoMdAdd className='size-12 text-btn-lmain' onClick={handleAddTodo} />
                </div>
                <div className='w-full'>
                    <h1 className='text-2xl text-btn-main font-medium'>Tasks</h1>
                    <div className='border-btn-lmain border-2 p-5 rounded-md'>
                        {todos.length === 0 ? (
                            <p className='text-lg font-semibold text-center'>No Tasks Yet!</p>
                        ) : (
                            <ol className='flex flex-col gap-2'>
                                {todos.map((todo) => (
                                    <div key={todo.id} className='flex w-full justify-between'>
                                        <li>{todo.name} - {todo.time}</li>
                                        <MdDelete className='text-btn-main size-5 hover:text-blue-950' onClick={() => handleDelete(todo.id)} />
                                    </div>
                                ))}
                            </ol>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Schedules;
