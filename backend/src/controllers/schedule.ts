import { Request, Response } from "express";
import { Schedule } from "../models/schedule";

//get schedules
export const getSchedules = async (req: Request, res: Response) => {
    try {
        //fix add zod validation
        const schedules = await Schedule.find();
        return res.status(200).json({
            success: true,
            messge: 'schedules fetched successs',
            todos: schedules
        })
    } catch (error) {
        
    }
}
//create shcedule
export const createschedule = async (req: Request, res: Response) => {
    try {
        //fix add zod validation
        try {
            const schedule = await Schedule.insertMany(req.body)

              return res.status(200).json({
                success: true,
                messge: 'schedules fetched successs',
                todos: schedule
            })
      
        } catch (error) {
            console.log(error, 'error in saving schedule in db')
        }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}