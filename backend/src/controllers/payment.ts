import { Request, Response } from 'express';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { Course } from '../models/course'; // Adjust the import path as needed
import { razorpayInstance } from '../configs/payment'
import crypto from 'crypto'
import { User } from '../models/user';
import dotenv from 'dotenv'
dotenv.config()

export const checkout = async (req: Request, res: Response) => {
  try {
    // Define schema for request body validation
    const recBody = z.object({
      courseId: z.string(),
      userId: z.string()
    });
    
    // Validate request body
    const parsedBody = recBody.safeParse(req.body);    
    // Check validation result
    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        message: 'Provide valid checkout details',
        errors: parsedBody.error
      });
    }

    // Fetch course details from the database
    try {
      const course:any = await Course.findById(parsedBody.data.courseId);          //fix any type
   
      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found'
        });
      }
     
      let order;
     try {
       // Create order using Razorpay
        order = await razorpayInstance.orders.create({
        amount: 50000,    //fix
        currency: 'INR',
        receipt: uuidv4(),
        notes: {
          userId: parsedBody.data.userId,
          courseId: parsedBody.data.courseId
        }
      });
      //what if order not created
      if(!order) {
        return res.status(500).json({
          success: false,
          message: 'order not generated'
        })
      }
     } catch (error) {
      console.log(error, 'error in creating order')
     }

      // Return order in response
      return res.status(200).json({
        success: true,
        message: 'Order created successfully',
        genOrder: order
      });
    } catch (error) {
      console.error('Error in fetching course details:', error);
      return res.status(500).json({
        success: false,
        message: 'Error in fetching course details',
      });
    }
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// payment varification handler
export const paymentVarification = async (req: Request, res: Response) => {
 try {
  try {
    //getting payment varification
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;
    // varifying signiture
    const secret: string | undefined = process.env.RAZORPAY_KEY_SECRET
    const body_data = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', secret || 'defaultSecret')
                                     .update(body_data)
                                     .digest("hex");
    // comparing signitures
    const isValid = expectedSignature === razorpay_signature;
    // Retrieve the order details from Razorpay
    const order = await razorpayInstance.orders.fetch(razorpay_order_id)
    
    //if varified
    if(isValid) {
      //push to users course
      const updateUserCourses = await User.findOneAndUpdate({_id: order?.notes?.userId}, {
        $push:{
          purchasedCourses: order?.notes?.courseId
        }
      }, {new: true})
      //push to user enrolled in course
      const updateCourse = await Course.findOneAndUpdate({_id: order?.notes?.courseId},{
        $push: {
          enrolledUsers: order?.notes?.userId
        }
      },{new: true})
      //redirect to success page
      return res.redirect('http://localhost:5173/payment/success')
    }else{
      return res.redirect('http://localhost:5173/payment/failed')
    }
  } catch (error) {
    console.log(error, 'error in payment varification')
  }
 } catch (error) {
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  })
 }
 
}
