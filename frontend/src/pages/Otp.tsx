import  { useEffect, useState } from 'react';
import otpLogo from '../assets/auth/otp.png';
import apiConnector from '../apiConnector';
import { auth } from '../backendUrls/auth';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../asyncActions/auth';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router';



const Otp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  //@ts-ignore
  const { user, error } = useSelector<any>((state) => state.auth);
  const [otp, setOtp] = useState<number>();
  const [isFetchingOtp, setIsFetchingOtp] = useState(false);

  useEffect(() => {
    const fetchOtp = async () => {
      setIsFetchingOtp(true);
      try {
        const response = await apiConnector('POST', auth.getOtp, user, { 'Content-Type': 'application/json' });
        const otpData: any = await response?.data;
        if( otpData.success === true) {
          toast.success('OTP send successfully')
        }else{
          toast.error('Try Again After Some Time')
        }
      } catch (error) {
        console.error("Error fetching OTP:", error);
      } finally {
        setIsFetchingOtp(false);
      }
    };

    if (user) {
      fetchOtp();
    }
  }, [user]);

  const handleInputChange = (event: any) => {
    setOtp(event.target.value);
  };

  const handleSubmit = () => {
    //check if otp is varified or not
    const data = {
      otp: Number(otp) ,
      ...user
    };
    dispatch(signup(data));
    if(error) {
      toast.error('Something went wrong')
    }else{
      toast.success('Please Login to continue')
      navigate('/login')
      
    }
  };

  return (
    <div className='h-screen w-full flex px-40 gap-28'>
      <div className='border-btn-main border-2 p-8 rounded-md text-center h-fit mt-32'>
        <h1 className='text-3xl text-center font-medium dark:text-white'>OTP Verification</h1>
        <p className='text-btn-lmain'>Enter OTP sent to your email address</p>
        <input
          className='m-10 h-10 px-4 py-2 rounded-md border-2 border-btn-main'
          type="text"
          placeholder='Enter OTP'
          value={otp}
          onChange={handleInputChange}
          disabled={isFetchingOtp}
        />
        <p className='dark:text-white'>Didn't receive OTP code?</p>
        <a className='text-btn-main' href="/">Resend Code</a> <br />
        <button
          className='bg-btn-main rounded-md h-10 px-4 py-2 text-white font-medium m-5 hover:bg-blue-950'
          onClick={handleSubmit}
          disabled={isFetchingOtp}
        >
          Verify & Proceed
        </button>
      </div>
      <div>
        <img className='h-[85vh]' src={otpLogo} alt="otp image" />
      </div>
    </div>
  );
};

export default Otp;
