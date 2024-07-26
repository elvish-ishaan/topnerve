import { TextDec } from './TextDec';
import analysis from '../assets/mainPage/analysis.png';
import { useNavigate } from 'react-router';

const Feat = () => {
  const navigate = useNavigate()
  return (
    <div className="p-1 overflow-x-hidden">
      <h2 className="text-btn-lmain text-center">
        <span className="font-medium px-4 text-4xl sm:text-5xl md:text-6xl text-black dark:text-white">Feature</span>
        You never have seen
      </h2>
      <div className="flex flex-col lg:flex-row p-5 mt-9">
        <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
          <TextDec />
        </div>
        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-btn-main">Question Modules:</h1>
          <p className="py-3 dark:text-white">
            Unlock a world of knowledge with our Diverse Questions Modules! Designed to challenge and inspire, each module covers a vast array of topics, from science and technology to history and art. Whether you're a curious learner, an educator, or a trivia enthusiast, our questions are crafted to engage and enlighten. Explore new perspectives, deepen your understanding, and test your knowledge with our dynamic and comprehensive question sets. Dive into our modules and discover the thrill of learning something new every day!
          </p>
          <button className="rounded-md font-medium text-white p-3 bg-btn-main"
           onClick={() => navigate('/signup')}
          >Solve Now</button>
        </div>
      </div>
      <hr className="bg-btn-lmain h-[2px]" />
      <div className="flex flex-col lg:flex-row p-5 mt-9">
        <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-btn-main">Performance Analysis:</h1>
          <p className="py-3 dark:text-white">
            Experience unparalleled insights with our Performance Analysis Module! Tailored to enhance your understanding and optimize your growth, this module provides a deep dive into your progress and achievements. Whether you're an athlete, student, or professional, our advanced analytics and intuitive dashboards offer a comprehensive view of your performance. Track your strengths, identify areas for improvement, and set new benchmarks for success. Elevate your potential with precise, actionable feedback and unlock your path to excellence with our cutting-edge Performance Analysis Module!
          </p>
          <button className="rounded-md font-medium text-white p-3 bg-btn-main"
           onClick={() => navigate('/signup')}
          >Analyse Now</button>
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <img src={analysis}  alt="analysis logo" className=" size-96" />
        </div>
      </div>
    </div>
  );
};

export default Feat;
