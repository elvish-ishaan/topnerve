import { Request, Response } from "express"
import { Course } from "../models/course";
import { any, z } from 'zod'
import { QuestionBank } from "../models/questionBank";
import { CourseTopic } from "../models/courseTopics";
import { CourseSub } from "../models/courseSub";
import { CourseChap } from "../models/courseChap";
import mongoose from "mongoose";
import { User } from "../models/user";
import { resetPassword } from "./user";

//all course handler
export const getAllCourses = async (req: Request, res: Response) => {
   try {
    //getting from db
    try {
         //returing all public courses of quiz
         const allCourses:any = await Course.find()  //fix {status: 'Public'}
         const subjects = []
         allCourses.map( async (course: any) => {
            const data = await CourseSub.findById(course.CourseSub)
             subjects.push(data)
         })
         return res.status(200).json({
             success: true,
             message: 'All Quiz Course fetched',
             courses: allCourses,
         })
    } catch (error) {
    }
   } catch (error) {
    return res.status(402).json({
        success: false,
        message: 'Internal Server Error'
    })
   }
}

//get one specific course handler
export const getOneCourse = async (req: Request, res: Response) => {
  try {
      // Adding zod validation
       const recParamId = z.object({
         courseId: z.string()
       });
       const parsedParam = recParamId.safeParse(req.params);
       
       if (!parsedParam.success) {
           return res.status(400).json({
               success: false,
               message: 'Provide a valid course ID',
               errors: parsedParam.error
           });
       }

      try {
          const courseId = parsedParam.data.courseId;
          // Find course and populate CourseSub
          const course = await Course.findById(courseId).populate({
            path: 'courseSubjects',
            populate: { path: 'chapterNames' }
        }).exec();

          const coursubss = await CourseSub.findById('667d0f17ecab3c10a06ba0d7')
          // Log the retrieved course

          // If course not found
          if (!course) {
              return res.status(404).json({
                  success: false,
                  message: 'Course not found'
              });
          }

          // Successfully found the course
          return res.status(200).json({
              success: true,
              message: 'Course details fetched successfully',
              courseDetails: course
          });
      } catch (error) {
          console.error('Error in getting one course from DB:', error);
          return res.status(500).json({
              success: false,
              message: 'Internal Server error'
          });
      }
  } catch (error) {
      console.error('Internal Server Error:', error);
      return res.status(500).json({
          success: false,
          message: 'Internal Server Error'
      });
  }
};

//create course handler
export const createCourse = async (req: Request, res: Response) => {
    try {
      // Define the schema for request body validation
      const recBody = z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        price: z.string(),
        courseSubId: z.array(z.string())
      });
  
      // Parse and validate the request body
      const parsedBody = recBody.safeParse(req.body);
      if (!parsedBody.success) {
        return res.status(400).json({
          success: false,
          message: 'Provide valid details',
          errors: parsedBody.error.errors 
        });
      }
  
      // Inserting into the database
      try {
        const { title, description, tags, price, courseSubId } = parsedBody.data;
        const newCourse = new Course({
          title,
          description,
          tags,
          price: Number(price),
          courseSubjects: courseSubId
        });
  
        const savedCourse = await newCourse.save();
        (savedCourse)
  
        return res.status(201).json({
          success: true,
          message: 'Course created successfully',
          createdCourse: savedCourse
        });
      } catch (error) {
        console.error('Error saving course in the database:', error);
        return res.status(500).json({
          success: false,
          message: 'Error saving course in the database',
        });
      }
    } catch (error) {
      console.error('Internal Server Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

//create question 
export const createQuestions = async (req: Request, res: Response) => {
     try {
      const recBody = z.object({
        question: z.string(),
        options: z.array(z.string()),
        answer: z.string(),
        explaination: z.string().optional()
    });

    // const parsedBody = recBody.safeParse(req.body);

    // if (!parsedBody.success) {
    //     return res.status(203).json({
    //         success: false,
    //         message: 'Provide Valid Details',
    //     });
    // }

       //inserting in db
       try {
        const newQuestionBank = new QuestionBank({
          questions: req.body.questionBag
        });
        const savedAns = await newQuestionBank.save();
          return res.status(200).json({
              success: true,
              message: 'question created successfully',
              createdAns: savedAns
          })
       } catch (error) {
          console.log(error,'error in saving questions in db')
       }
     } catch (error) {
      return res.status(402).json({
          success: false,
          message: 'Internal Server Error'
      })
     }
    }

//create topic handler
export const createTopic = async (req: Request, res: Response) => {
    try {
      const recBody = z.object({
        title: z.string(),
        discription: z.string(),
        level: z.string(),
        questionBankId: z.array(z.string())
    });

    const parsedBody = recBody.safeParse(req.body);

    if (!parsedBody.success) {
        return res.status(203).json({
            success: false,
            message: 'Provide Valid Details',
            error: parsedBody.error
        });
    }
      //inserting in db
      try {
         const savedTopic = new CourseTopic({
             title: parsedBody.data?.title,
             discription: parsedBody.data?.discription,
             level: parsedBody.data?.level,
             questionBank: parsedBody.data?.questionBankId,
         });
         await savedTopic.save();
         return res.status(200).json({
             success: true,
             message: 'topic created successfully',
             createdTopic: savedTopic
         })
      } catch (error) {
         console.log(error,'error in saving questions in db')
      }
    } catch (error) {
     return res.status(402).json({
         success: false,
         message: 'Internal Server Error'
     })
    }
}

//crete chapters handler
export const createChap = async (req: Request, res: Response) => {
    try {
      const recBody = z.object({
        title: z.string(),
        topicId: z.array(z.string())
    });

    const parsedBody = recBody.safeParse(req.body);

    if (!parsedBody.success) {
        return res.status(203).json({
            success: false,
            message: 'Provide Valid Details',
        });
    }
      //inserting in db
      try {
         const savedsub = new CourseChap({   //fix the name here
             title: parsedBody.data?.title,
             topics: parsedBody.data?.topicId,
         });
         await savedsub.save();
         return res.status(200).json({
             success: true,
             message: 'chapter created successfully',
             createdChap: savedsub
         })
      } catch (error) {
         console.log(error,'error in saving subjects in db')
      }
    } catch (error) {
     return res.status(402).json({
         success: false,
         message: 'Internal Server Error'
     })
    }
}

//create subjects handler
export const createSubject = async (req: Request, res: Response) => {
    try {
      const recBody = z.object({
        title: z.string(),
        chapterId: z.array(z.string())
    });

    const parsedBody = recBody.safeParse(req.body);

    if (!parsedBody.success) {
        return res.status(203).json({
            success: false,
            message: 'Provide Valid Details',
            error: parsedBody.error
        });
    }
      //inserting in db
      try {
         const savedChap = await CourseSub.create({
             title: parsedBody.data?.title,
             chapterNames: parsedBody.data?.chapterId,
         });
         await savedChap.save();
         return res.status(200).json({
             success: true,
             message: 'Subject created successfully',
             createdSubject: savedChap
         })
      } catch (error) {
         console.log(error,'error in saving chapters in db')
      }
    } catch (error) {
     return res.status(402).json({
         success: false,
         message: 'Internal Server Error'
     })
    }
}

//practice handler
export const getPractice = async (req: Request, res: Response) => {
  try {
    const recBody = z.object({
      courseId: z.string().uuid()
    })
    const parsedBody = recBody.safeParse(req.params);
    if(!parsedBody) {
      return res.status(203).json({
          success: false,
          message: 'Provide Valid course id',
      });
   }
   try {
    const course = await Course.findById(parsedBody.data?.courseId);
   if(!course) {
    return res.status(404).json({
      success: false,
      message: 'no practice found'
    })
   };
   return res.status(200).json({
    success: true,
    message: 'practice fetched successfully',
    course
   })
   } catch (error) {
    console.log(error, 'error in fetching pracitce from db')
   }
  } catch (error) {
    return res.status(402).json({
      success: false,
      message: 'Internal Server Error'
  })
  }
}

//get user courses
export const userCourses = async (req: Request, res: Response) => {
   const { userId } = req.params;
   const user: any = await User.findById(userId).populate('purchasedCourses')
  if( !user ) {
    return res.status(404).json({
      success: false,
      message: 'No user Found'
    })
  }
   if( user?.purchasedCourses === 0) {
    return res.send(404).json({
      success: false,
      message: 'no course found',
    })
   }
   res.status(200).json({
    success: true,
    message: 'course fetched',
    courses: user?.purchasedCourses
   })
}

//get topics of subject
export const getTopics = async (req: Request, res: Response) => {
  const {id} = req.params
  const topics = await CourseChap.findById(id).populate('topics');
  res.json({
    success: true,
    message: 'topics fetched successfully',
    topics
  })
}

//get chapters of subject
export const getChapters = async (req: Request, res: Response) => {
  const {id} = req.params;
  const chapters = await CourseSub.findById(id).populate('chapterNames');
  res.json({
    success: true,
    message: 'chapters fetched successfully',
    chapters
  })
}

//get subjects of course
export const getSubjects = async (req: Request, res: Response) => {
  const {id} = req.params;
  const subjects = await Course.findById(id).populate('courseSubjects')
  res.json({
    success: true,
    message: 'subjects fetched successfully',
    subjects
  })
}

//get questions
export const getquestionbank = async (req: Request, res: Response) => {
  const {id} = req.params
  const quesitons = await CourseTopic.findById(id).populate('questionBank');
  res.json({
    success: true,
    message: 'questions fetched success',
    quesitons
  })
}