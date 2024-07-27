import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router';
import { FaArrowCircleRight } from "react-icons/fa";


interface Test {
  avgTime: number;
  date: number;
  questionBankId: string;
  score: number;
  timeSpend: any[];
  totalTime: number;
  __v: number;
  _id: string;
}

const tests: Test[] = [
  {
    avgTime: 0.9654571428571428,
    date: 1722055983577,
    questionBankId: "669f7b267249f9cefb681c4d",
    score: -6,
    timeSpend: [],
    totalTime: 33.791,
    __v: 0,
    _id: "66a47e18cd96309ae5ecd60f"
  }
];

const TestCard = ({ test }: { test: Test }) => {
  const navigate = useNavigate()
  const formattedDate = moment(test.date).format('MMMM Do YYYY, h:mm:ss a');

  const handleClick = () => {
    navigate(`/practice/result/${test._id}`);
  };

  return (
    <div 
      className="p-4 border rounded-lg shadow-lg  flex items-center cursor-pointer w-full"
      onClick={handleClick}
    >
      <div className="flex justify-between w-full">
        <p className="text-gray-700 dark:text-gray-400">Date: {formattedDate}</p>
        <p className="text-gray-700 dark:text-gray-400">Score: {test.score}</p>
        <p className="text-gray-700 dark:text-gray-400">Total Time: {test.totalTime.toFixed(2)}s</p>
      </div>
      <div className=' p-5 ml-20'>
      <FaArrowCircleRight className=' dark:text-white size-8' />
      </div>
    </div>
  );
};

const MyTests: React.FC = () => {
  return (
    <div className=" w-full p-8 dark:bg-slate-900">
      <h2 className="text-3xl font-bold text-btn-main dark:text-gray-300 mb-8">Test Results</h2>
      <div className="space-y-4">
        {tests.map(test => (
          <TestCard key={test._id} test={test} />
        ))}
      </div>
    </div>
  );
};

export default MyTests;
