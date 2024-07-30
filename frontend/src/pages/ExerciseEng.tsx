import { useEffect, useState } from 'react';
import Timer from '../components/Timer';
import Modal from '@mui/material/Modal';
import InstructionPoints from '../components/InstructionData';
import { useNavigate, useParams } from 'react-router';
import apiConnector from '../apiConnector';
import { course } from '../backendUrls/course';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import LoadingButton from '../components/LoadingButton';
import QuesSlider from '../components/QuesSlider';
import toast from 'react-hot-toast';


const ExerciseEng = () => {
  const {user} = useSelector((state: any) => state.auth)
  const params = useParams();
  const navigate = useNavigate()
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [explainModal, setExplainModal] = useState(false);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [test, setTest] = useState<string>('')
  const [time, setTime] = useState<any>(0)
  const [quesLoading, setQuesLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [showExpBtn, setShowExpBtn] = useState<boolean>(false)
  // Fetching questions
  useEffect(() => {
    const fetchQuestions = async () => {
      setQuesLoading(true)
      const res: any = await apiConnector('GET', course.getQuestionBank + params.questbankid, {
        'Content-Type': 'application/json',
      });
      setQuesLoading(false)
      setQuestions(res?.data?.quesitons?.questionBank[0]?.questions);
    };
    fetchQuestions();
  }, []);

  // Handling when user clicks answer
  const handleAnsClk = (e: any) => {
    if (isDisabled) return;

    const selectedText = e.currentTarget.innerText.trim();

    // Calculate time spent on the current question
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000; // time in seconds
    setTimeSpent([...timeSpent, timeTaken]);
    setStartTime(endTime); // reset start time for the next question

    // Checking answer
    if (selectedText === questions[count]?.answer) {
      e.currentTarget.classList.add('border-green-600');
      setScore(score + 1);
      setIsDisabled(true);
    } else {
      //make exp btn visible
      setShowExpBtn(true)
      //add score
      setScore( score - 4)
      //add borders
      e.currentTarget.classList.add('border-red-600');
      //show the correct answer
      const allOptionBtns = document.getElementsByClassName('option-button');
      //get correct ans btn
      Array.from(allOptionBtns).forEach((btn: any) => {
        if( btn.innerText === questions[count]?.answer ){
            btn.classList.add('border-green-600')
        }
      })
      //set show explaination btn 

      setIsDisabled(true);
    }
  };
  //hadling reset 
  const resetBorders = () => {
    const buttons = document.querySelectorAll('.option-button');
    buttons.forEach(button => {
      button.classList.remove('border-green-600', 'border-red-600');
    });
  };

  // Handle next question
  const handleNext = () => {
    //invisibel exp btn
    setShowExpBtn(false)
    if (count < questions.length - 1) {
      resetBorders()
      setCount(count + 1);
      setIsDisabled(false);
      setStartTime(Date.now()); // reset start time for the next question
    }
  };

  // Handle previous question
  const handlePrev = () => {
    if (count > 0) {
      resetBorders()
      setCount(count - 1);
      setIsDisabled(false);
      setStartTime(Date.now()); // reset start time for the next question
    }
  };
  // Calculate total time spent and average time per question for analytics
  // const totalTime = timeSpent.reduce((acc, curr) => acc + curr, 0);
  // const avgTime = totalTime / (timeSpent.length || 1);

  // Handle submit
  const handleSubmit = async () => {
    const totalTime = timeSpent.reduce((acc, curr) => acc + curr, 0);
    const avgTime = totalTime / questions.length;
    const testReport = {
      userId: user._id,
      questionBankId: params.questbankid,
      score: score,
      totalTime: totalTime,
      avgTime: avgTime,
      timeSpent: timeSpent,
      date: new Date().toISOString(),
      totalQues: questions.length
    };
    setLoading(true)
    const res: any = await apiConnector('POST', course.createTest, testReport, {'Content-Type': 'application/json'})
    setLoading(false)
    if( res?.data?.message !== true) {
      toast.error('Submission Failed')
    }
    setTest(res?.data?.test)
    toast.success('Submitted Sucessfully')
    
  };

 // Redirect to result page when test is set
 useEffect(() => {
  // @ts-ignore
  if (test && test._id) {
    //@ts-ignore
    navigate(`/practice/result/${test._id}`);
  }
}, [test, navigate]);


  return (
    <div className="h-screen w-full flex">
      <Modal
        className="flex justify-center"
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="shadow-md rounded mt-28 h-fit p-8 w-1/2 bg-slate-900 text-center">
          <h1 className="text-2xl text-btn-main font-medium tracking-wider py-2">INSTRUCTIONS</h1>
          <InstructionPoints />
          <button
            className="rounded-md font-medium h-10 py-2 px-4 text-white bg-btn-main m-5"
            onClick={() => setModalOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
      <div className="flex w-full">

        <div className="p-8 w-full">
          {/* progress */}
          <div className="flex justify-center items-center w-full">
            <div className="w-1/4 text-blue-500">
              <QuesSlider count={count} totalLength={questions?.length}/>
            </div>
          </div>

          {/* header div */}
          <div className="flex justify-between border-b-2 border-btn-main p-2 w-full">
           {
            // @ts-ignore
             <Timer setTime={setTime} time={time} />
           }
            <div className="flex gap-3 items-center justify-center">
              <button
                className="h-10 px-4 py-2 rounded-md border-2 border-btn-main dark:text-white font-medium hover:bg-blue-950"
                onClick={() => setModalOpen(true)}
              >
                Instructions
              </button>
              {
                count == questions.length - 1 ? <div>
                  {
                  loading ? <LoadingButton/> :
                  <button
                  className="h-10 px-4 py-2 rounded-md bg-btn-main text-white font-medium hover:bg-blue-950"
                  onClick={handleSubmit}
                  disabled={count < questions.length - 1}
                >
                  Submit
                </button>
                }
                </div>
                : <p>hl</p>
              }
              
            </div>
          </div>

          {/* question box */}
          {
            quesLoading ? <LoadingSpinner/> :
            <div>
               <div className="flex p-4 text-lg font-semibold border-2 border-btn-lmain rounded-md mt-8 dark:text-white">
                 <span>Q:</span>
                 <p className="px-3">{questions[count]?.question}</p>
               </div>

               {/* answer box */}
               <div>
            {questions[count]?.options?.map((option: string, index: number) => {
              return (
                <button
                  key={index}
                  className={`option-button border-2 border-btn-main rounded-md my-3 p-4 w-full flex dark:text-white hover:bg-gray-100
                    dark:hover:bg-blue-800`}
                  id={index.toString()}
                  disabled={isDisabled}
                  onClick={handleAnsClk}
                >
                  {option}
                </button>
              );
            })}
               </div>
          </div>
          }

          {/* explanation modal */}
          <Modal
            className="flex justify-center"
            open={explainModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="shadow-md rounded mt-28 h-fit p-8 w-1/2 bg-slate-900 text-center">
              <h1 className="text-2xl text-btn-main font-medium tracking-wider py-2">Explanation</h1>
              {
                questions[count]?.explaination == null ? <p className=' text-white italic text-2xl'>No explaination found</p> :
                <p>{questions[count]?.explaination}</p>
              }
              <button
                className="rounded-md font-medium h-10 py-2 px-4 text-white bg-btn-main m-5"
                onClick={() => setExplainModal(false)}
              >
                Close
              </button>
            </div>
          </Modal>

          {/* navigation buttons */}
          <div className="flex w-full justify-around my-8">
            <button
              className="h-10 px-4 py-2 rounded-md bg-btn-main text-white font-medium hover:bg-blue-950"
              onClick={handlePrev}
              disabled={count === 0}
            >
              Previous
            </button>

            {
              showExpBtn && <button
              className="h-10 px-4 py-2 rounded-md bg-btn-main text-white font-medium hover:bg-blue-950"
              onClick={() => setExplainModal(true)}
             >
              Explain
            </button>
            }

            <button
              className="h-10 px-4 py-2 rounded-md bg-btn-main text-white font-medium hover:bg-blue-950"
              onClick={handleNext}
              disabled={count === questions.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ExerciseEng;
