import { Request, Response } from "express";
import { Test } from "../models/test";
import { User } from "../models/user";
import { any, string, z } from 'zod'
import { AdditionalDetails } from "../models/additionalDetails";
import { badges } from "../utils/milestones/badges";






//get test history
export const getTestHistory = async (req: Request, res: Response) => {
  //fix zod validation
  try {
    const user = await User.findById(req?.body?.userId).populate('tests')
    if(!user) {
      return res.status(404).json({
        success: false,
        message: 'No User found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Tests fetched successfully',
      tests: user?.tests
    })
  } catch (error) {
    console.log(error)
  }
}


//create test
export const createTest = async (req: Request, res: Response) => {
    try {
        const testSchema = z.object({
            questionBankId: z.string(),
            score: z.number(),
            totalQues: z.number(),
            totalTime: z.number().min(0),
            avgTime: z.number(),
            timeSpent: z.array(z.number()).min(0),
            userId: z.string(),
          });
      // Validate the request body using Zod
      const {
        questionBankId,
        score,
        totalTime,
        avgTime,
        timeSpent,
        userId,
        totalQues
      } = testSchema.parse(req.body);
  
      try {
        const test = new Test({
          questionBankId,
          score,
          totalTime,
          avgTime,
          timeSpent,
          totalQues
        });
        // Save the test to the database
        await test.save();
    
        // Push the test to the user
        const user: any = await User.findByIdAndUpdate(userId, {
          $push: {
            tests: test.id
          },
          $set: {
            totalQuestionsDone: 600        //fix this to add to previous questions
          }
        }, { new: true });
        try {
          //checking for achements
        if( user?.additionalDetails?.achievements?.some( (x: any) => x?.name === "Solver" || "Acheaver" || "Conqueror" )){
          return null
       }else if(user?.totalQuestionsDone > 500){
         const updatedAch = await AdditionalDetails.findByIdAndUpdate({_id: user.additionalDetails},{
           $push: {
             achievements: badges[0]
           }
         })
       }

        } catch (error) {
          console.log(error, 'error in updating acheviments')
        }
        //return res
        res.json({
          success: true,
          message: 'Test created successfully',
          test
        });
      } catch (error) {
        console.log(error, 'error in inserting test to db')
      }  
      
    } catch (error: any) {
      if (error) {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.errors
        });
      } else {
        console.error(error);
        res.status(500).json({
          success: false,
          message: 'Internal server error',
          error: error.message
        });
      }
    }
  };

//get test
export const getTest = async (req: Request, res: Response) => {
    const {id} = req.params;
    const test = await Test.findById(id);       //bug fix why population of questionbank not occuring
    res.json({
        success: true,
        message: 'Test fetched successffuly',
        test
    })
}

