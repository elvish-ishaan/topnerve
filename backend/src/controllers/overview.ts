import { Request, Response } from "express";
import { User } from "../models/user";
import { z } from 'zod'
import { model } from "mongoose";

export const getPerformance = async (req: Request, res: Response) => {
    const recBody = z.object({
        userId: z.string(),
    })
    const parsedBody = recBody.safeParse(req.body)
    if(!parsedBody.success){
        res.status(404).json({
            success: false,
            message: 'Provide valid detaials',
            error: parsedBody.error
        })
    }
    try {
        try {
            const user: any = await User.findById(parsedBody.data?.userId).populate('tests')
            //if no user found
            if( !user ) {
                return res.status(404).json({
                    success: false,
                    messsage: 'No user found'
                })
            }
            if (user.tests.length == 0 ) {
                return res.status(404).json({
                    success: false,
                    message: 'No Tests Found'
                })
            }
        const data = user.tests.map((test: any) => test.score)
        res.status(200).json({
            success: true,
            message: 'data fetched success',
            data
        })
        } catch (error) {
            console.log(error,'error in getting graph data from db')
        }
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}