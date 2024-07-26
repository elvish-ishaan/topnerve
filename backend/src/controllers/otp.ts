import { Request, Response } from 'express';
import { z } from 'zod';
import { Otp } from '../models/otp'
import { generateOTP, generateCustomOTP } from "otp-agent";
import { sendMail } from '../utils/mails/mailSender';
import { otpTemp } from '../utils/mails/mailTemplate';

export const otp = async (req: Request, res: Response) => {
    try {
        const recBody = z.object({
            email: z.string().email()
        });
    
        const parsedBody = recBody.safeParse(req.body);
    
        if (!parsedBody.success) {
            return res.status(400).json({
                success: false,
                message: 'Enter a valid email'
            });
        }
        //generate otp 
        const genOtp = generateOTP()
        //save otp to db
        try {
            const otpUser = await Otp.create({
                email: parsedBody.data.email,
                otp: genOtp
            })
            otpUser.save()

            //sending otp through mail
            await sendMail(parsedBody.data.email,'otp varify', otpTemp(genOtp))
            

            res.status(200).json({
                success: true,
                message: 'otp generated succesfully'
            })
    
        } catch (error) {
            console.log(error, 'error in otp save')
        }
    
    } catch (error) {
        res.status(500).json({
          success: false,
          message: 'internal server error'
        })
    }
   
};
