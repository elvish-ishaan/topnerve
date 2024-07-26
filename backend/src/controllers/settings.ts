import { User } from '../models/user';
import{ z } from 'zod'
import { Request, Response } from 'express';
import { uploadFile } from '../utils/uploadFile';
import { AdditionalDetails } from '../models/additionalDetails';

export const updateProfile = async (req: Request, res: Response) => {
    try {
        //uploading file
        const uploaded = await uploadFile(req?.file?.path);
        const recBody = z.object({
            firstName: z.string(),
            lastName: z.string(),
            mobile: z.string(),
            bio: z.string(),
            userId: z.string(),
        });
        
        const parsedBody = recBody.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({
                success: false,
                message: 'Provide all details to update',
                error: parsedBody.error
            });
        }
        
        try {
            const userId = await User.findById(parsedBody.data.userId)
            const updatedUser = await AdditionalDetails.findByIdAndUpdate(
                { _id: userId?.additionalDetails},
                {
                    $set: {
                        firstName: parsedBody.data.firstName,
                        LastName: parsedBody.data.lastName,
                        profile: uploaded?.secure_url,
                        Mobile: Number(parsedBody.data.mobile),
                        bio: parsedBody.data.bio
                    }
                },
                {new: true} 
            )
            if (!updatedUser) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            //send updated user full profile
            const updatedProfile = await User.findById(parsedBody.data.userId).populate('additionalDetails');
            //make password and other confidential undef
            return res.status(200).json({
                success: true,
                message: 'User Updated Successfully',
                updatedProfile
            });
        } catch (error) {
            console.error('Error in updating user in DB', error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error while updating user'
            });
        }

    } catch (error) {
        console.error('Internal Server Error', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}
