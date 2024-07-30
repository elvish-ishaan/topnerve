
import { useNavigate } from 'react-router';
import paymentSuccess from '../assets/payments/paymentSucc.gif'

const PaymentSuccess = () => {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className=" bg-slate-900 shadow-lg rounded-lg p-8 max-w-md text-center">
        <img className=' size-52 rounded-md ml-20' src={paymentSuccess} alt="payment sucesss img" />
        <h1 className="text-2xl font-semibold text-green-600 mb-2">Payment Successful!</h1>
        <p className=" text-btn-lmain mb-6">Thank you for your purchase. Your transaction has been completed successfully.</p>
        <button
          className="bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition duration-300"
          onClick={() => navigate('/')}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
