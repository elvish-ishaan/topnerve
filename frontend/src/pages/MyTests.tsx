import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import apiConnector from '../apiConnector';
import { test as testUrl } from '../backendUrls/test';

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

const TestCard = ({ test }: { test: Test }) => {
  const navigate = useNavigate();
  const formattedDate = moment(test.date).format('MMMM Do YYYY, h:mm:ss a');

  // Handling user clicks specific test
  const handleClick = () => {
    navigate(`/practice/result/${test._id}`);
  };

  return (
    <div 
      className="p-2 border rounded-lg shadow-lg flex items-center cursor-pointer w-full"
      onClick={handleClick}
    >
      <div className="flex justify-between w-full">
        <p className="text-gray-700 dark:text-gray-400">Date: {formattedDate}</p>
        <p className="text-gray-700 dark:text-gray-400">Score: {test.score}</p>
        <p className="text-gray-700 dark:text-gray-400">Total Time: {test.totalTime.toFixed(2)}s</p>
      </div>
      <div className='p-2 ml-20'>
        <FaArrowCircleRight className='dark:text-white size-8' />
      </div>
    </div>
  );
};

const MyTests: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [tests, setTests] = useState<Test[]>([]);

  // Fetching all tests
  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      const bodyToSend = {
        userId: user._id,
      };
      const res = await apiConnector("POST", testUrl.getTestHistory, bodyToSend);
      setLoading(false);
      setTests(res?.data?.tests || []);
    };

    fetchTests();
  }, [user._id]);

  return (
    <div className="w-full p-8">
      <h2 className="text-3xl font-medium text-btn-main dark:text-gray-300 mb-8">Test Results</h2>
      <div className="space-y-4">
        {tests.map(test => (
          <TestCard key={test._id} test={test} />
        ))}
      </div>
    </div>
  );
};

export default MyTests;
