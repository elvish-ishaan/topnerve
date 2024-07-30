import { MdDeleteOutline } from "react-icons/md";

import { useState, useEffect } from 'react';

const CreateSchedule = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [taskName, setTaskName] = useState('');
  const [taskTime, setTaskTime] = useState('');

  // Load tasks from local storage on component mount
  useEffect(() => {
    //@ts-ignore
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem('tp-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (taskName && taskTime) {
      const newTask = { id: Date.now(), name: taskName, time: taskTime };
      setTasks([...tasks, newTask]);
      setTaskName('');
      setTaskTime('');
    }
  };

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 w-full">
      <div className=" bg-slate-900 shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">Create Schedule</h1>
        <div className="mb-4">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="time"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
          onClick={handleAddTask}
        >
          Add Task
        </button>
        <ul>
          {tasks.map(task => (
            <li key={task.id} className="flex items-center justify-between mb-2 p-2 border border-gray-300 rounded-lg">
              <div>
                <p className="font-semibold dark:text-white">{task.name}</p>
                <p className="dark:text-white">{task.time}</p>
              </div>
              <button
                className="text-red-600 hover:text-red-500 transition duration-300"
                onClick={() => handleDeleteTask(task.id)}
              >
                <MdDeleteOutline className=" size-5" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateSchedule;
