import { Request, Response } from "express"
import { User } from "../models/user";
import bcrypt from 'bcrypt'
import {  z } from 'zod'
import { Otp } from "../models/otp";
import { v4 as uuidv4 } from 'uuid';
import { sendMail } from "../utils/mails/mailSender";
import { resetPassTemp } from "../utils/mails/resetPassTemp";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
import { AdditionalDetails } from "../models/additionalDetails";
dotenv.config();

//sign up handler
export const signup = async (req: Request, res: Response) => {
    // Define the Zod schema for validation
    const recData = z.object({
        otp: z.number(),
        name: z.string(),
        email: z.string().email(),
        password: z.string()
    });

    // Parse and validate the request body
    const parsedData = recData.safeParse(req.body);

    // If validation fails, return a 400 response with the validation errors
    if (!parsedData.success) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: parsedData.error.errors
        });
    }

    const { name, email, password, otp } = parsedData.data;
    //getting latest otp 
    const savedOtp = await Otp.findOne({email}).sort({ createdAt: -1 }).exec();
    if(otp !== savedOtp?.otp ) {
        res.status(203).json({
            success: false,
            message: 'Invalid OTP'
        })
    }

    //checking if user might be already registered
    const alreadyUser = await User.findOne({email: parsedData.data.email});
    if(alreadyUser){
        return res.status(203).json({
            success: false,
            message: 'User Already Registered'
        })
    }

    try {
        //generate empty data for addditional details
        const additionalDetail = new AdditionalDetails({
            profile: '',
            firstName: '',
            lastName: "",
            Mobile: undefined,
            bio: ''
        })
        await additionalDetail.save()
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user to the database
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            additionalDetails: additionalDetail._id
        });

        // Save the user instance
        await user.save();

        // Return a success response
        res.status(200).json({
            success: true,
            message: 'User created successfully'
        });
    } catch (error) {
        console.error('Error in saving user:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

//login handler
export const login = async (req: Request, res: Response) => {
    try {
        // Define Zod schema for validation
        const recBody = z.object({
            email: z.string().email('Enter valid email'),
            password: z.string()
        });

        // Validate request body against schema
        const parsedBody = recBody.safeParse(req.body);

        // Check if validation succeeded
        if (!parsedBody.success) {
            return res.status(400).json({
                success: false,
                message: 'Please provide valid email and password',
                errors: parsedBody.error.errors
            });
        }

        // Find user by email
        //fix user type fix userDocument import problem
        const user: any = await User.findOne({ email: parsedBody.data.email }).populate('additionalDetails');

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not registered. Please sign up to continue.'
            });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(parsedBody.data.password, user.password || '');

        if (passwordMatch) {
            // Generate JWT token
            const token = jwt.sign(
                { email: user.email, id: user._id },
                'secretsuper',  //fix this env varible
                { expiresIn: '24h' }
            );

            // Update user document with the new token and save it
            user.token = token;
            await user.save();

            // Prepare options for setting cookie
            const cookieOptions = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
                httpOnly: true
            };

            // Set token cookie and respond with success
            res.cookie('token', token, cookieOptions).status(200).json({
                success: true,
                token,
                user: {
                    _id: user._id,
                    email: user.email,
                    milestones: user.additionalDetails.achievements,
                    // Add any other user details you want to send back
                },
                message: 'User login successful'
            });
        } else {
            // Passwords do not match
            return res.status(401).json({
                success: false,
                message: 'Password is incorrect'
            });
        }
    } catch (error) {
        console.error(error);
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success: false,
            message: 'Login failed. Please try again later.'
        });
    }
};

//reset password handler
export const resetPassword = async (req: Request, res: Response) => {
    try {
        const recBody = z.object({
            email: z.string().email(),
        });
    
        const parsedBody = recBody.safeParse(req.body);
    
        if (!parsedBody.success) {
            return res.status(400).json({
                success: false,
                message: 'Enter a Valid Email'
            });
        }
        let genToken: string = '';
        try {
            //saving token to db
             genToken = uuidv4()
             const user = await User.findOneAndUpdate({email: parsedBody.data.email},{
                 $set:{
                     token: genToken
                 }
        }, {new: true})
        await user?.save()
        } catch (error) {
            console.log(error, 'error in saving token to user')
        }
        //sending reset url to
        let url = `http://localhost:5173/reset-password/${genToken}`
        await sendMail(parsedBody.data.email, 'link for reset password', resetPassTemp(url))
    
        res.status(200).json({
            success: true,
            message: 'reset password link sent successfully'
        })
    } catch (error) {
        res.status(402).json({
            success: false,
            message: 'Internal Server Error'
        })
    }

}


//updating passoword
export const updatePassword = async (req: Request, res: Response) => {
    try {
        // Define Zod schema for validation
        const recBody = z.object({
            token: z.string(),
            updatedPassword: z.string().min(6, "Password must be at least 6 characters long")
        });

        // Combine request params and body
        const paramWithBody = {
            token: req.body.token,
            updatedPassword: req.body.updatedPassword
        };

        // Validate the combined object
        const parsedBody = recBody.safeParse(paramWithBody);
        if (!parsedBody.success) {
            return res.status(400).json({
                success: false,
                message: 'Enter correct credentials',
                errors: parsedBody.error.errors
            });
        }

        try {
                 // Extract validated data
             const { token, updatedPassword } = parsedBody.data;     
             // Hash the updated password
             const updatedHashedPassword = await bcrypt.hash(updatedPassword, 10);
     
             // Update the user's password in the database
             const updatedUser = await User.findOneAndUpdate(
                 { token: token },
                 { $set: { password: updatedHashedPassword } },
                 { new: true } // Return the updated document
             );
             (updatedUser, 'updated user')
             // Check if user was found and updated
             if (!updatedUser) {
                 return res.status(404).json({
                     success: false,
                     message: 'User not found or invalid token'
                 });
             }
        } catch (error) {
        }

        // Respond with success message
        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const changePassword = async (req: Request, res: Response) => {
    try {
      const recBody = z.object({
        userId: z.string(),
        oldPassword: z.string(),
        newPassword : z.string()
      })
      const parsedBody = recBody.safeParse(req.body);
      if( !parsedBody.success) {
        return res.status(404).json({
            success: false,
            message: "provide correct details to update",
            error: parsedBody.error
        });
      }
      try {
      //check old and stored password are same
      const user: any = await User.findById(parsedBody.data.userId)   //fix this
      const passwordMatch = await bcrypt.compare(parsedBody.data.oldPassword, user?.password || '');
      if(passwordMatch) {
        //hash the password
        const hashedPassword = await bcrypt.hash(parsedBody.data.newPassword, 10);
        //update the password
        const updatedUser = await User.findByIdAndUpdate({_id: parsedBody.data.userId},{
            $set: {
                password: hashedPassword
            }
          }, {new: true});
          //returning responce
       return res.status(200).json({
        success: true,
        message: 'password updated successfully'
      })
      }else{
        return res.status(500).json({
            success: false,
            messasge: 'Old password doesnt match'
        })
      }
      } catch (error) {
        console.log(error, 'error in updating user password')
      }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}