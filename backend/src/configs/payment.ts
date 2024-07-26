import razorpay from 'razorpay';
import dotenv from 'dotenv'
dotenv.config()
const RAZORPAY_kEY_ID = process.env.RAZORPAY_KEY_ID || ''
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || ''

export const razorpayInstance = new razorpay({
    key_id: RAZORPAY_kEY_ID , 
    key_secret: RAZORPAY_KEY_SECRET
  });
