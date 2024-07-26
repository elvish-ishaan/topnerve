import { Request, Response } from "express";
import { User } from "../models/user";

export const getRankers = async (req: Request, res: Response) => {    //fix this
    const results = await User.find().sort({totalQuestionsDone: -1})
    const rankers = results.map((user) => user.name)
    res.json({
        success: true,
        message: 'Leaderboard fetched succesfully',
        rankers
    })
}