// src/components/PaymentFailure.jsx

import { useNavigate } from 'react-router';
import { ImCross } from "react-icons/im";


const PaymentFailure = () => {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className=" bg-slate-900 shadow-lg rounded-lg p-8 max-w-md text-center">
      <ImCross className=' text-5xl text-red-600 ml-40 my-4'/>
      <h1 className="text-2xl font-semibold  text-red-600 mb-2">Payment Failed</h1>
        <p className=" text-btn-lmain mb-6">Unfortunately, your transaction could not be completed. Please try again.</p>
        <div className=' flex gap-5 justify-center'>
        <button
          className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition duration-300"
          onClick={() => navigate('/')}
        >
          Go to Home
        </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
