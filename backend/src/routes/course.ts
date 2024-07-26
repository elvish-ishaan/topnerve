import express from 'express'
import { createChap, createCourse, createQuestions, createTopic, getAllCourses, getOneCourse,
     getPractice, createSubject, userCourses, 
     getTopics,
     getChapters,
     getSubjects,
     getquestionbank} from '../controllers/course';
const router = express.Router()

//to get all courses
router.get('/getallcourses', getAllCourses);
//course by id
router.get('/:courseId', getOneCourse);
//practice that course
router.get('/:courseId/practice', getPractice)
//create new course
router.post('/createcourse', createCourse)
//add subjects to course
router.post('/addsubject', createSubject)
//add chapter to that course
router.post('/addchapter', createChap)
//add topics to that course
router.post('/addtopic', createTopic);
//add questions to that course
router.post('/addquestions', createQuestions)
//get course for authorized user
router.get('/usercourses/:userId', userCourses)
//get subjects of course
router.get('/usercourse/subject/:id', getSubjects)
//get chapters of subjects
router.get('/usercourses/chapters/:id', getChapters)
//get subject topics
router.get('/usercourses/topics/:id', getTopics)
//get questions
router.get('/usercourses/getquestionbank/:id', getquestionbank)

export default router;