import { Request, Response } from "express";
import { TalkExpert } from "../models/expertTalk";
import { FeedBack } from "../models/FeedBack";

export const talkExpert = async (req: Request, res: Response) => {
    try {
        try {
            const expertTalk = new TalkExpert({
                name: req.body.name,
                mobile: Number(req.body.mobile),
            })
            await expertTalk.save()

            if(!expertTalk){
                return res.status(500).json({
                    success: false,
                    message: 'Error in saivng details'
                })
            }
            res.status(200).json({
                success: true,
                message: 'Details Send Success'
            })

        } catch (error) {
            console.log(error, 'error in saving expert talk details to db')
        }
    } catch (error) {
        res.status(500).json({
           success: false,
           message: 'Internal Server Error'
        })
    }
}

//handle feat request
export const featReq = async (req: Request, res: Response) => {
    try {
        try {
            const feedback = new FeedBack({
                email: req.body.email,
                message: req.body.message,
            })
            await feedback.save()
            if(!feedback){
                return res.status(500).json({
                    success: false,
                    message: 'Error in saivng details'
                })
            }
            res.status(200).json({
                success: true,
                message: 'Feedback Success'
            })

        } catch (error) {
            console.log(error, 'error in saving expert talk details to db')
        }
    } catch (error) {
        res.status(500).json({
           success: false,
           message: 'Internal Server Error'
        })
    }
}