import {  useEffect, useRef, FC } from 'react';
import { FaClock } from "react-icons/fa6";



const Timer: FC = ( props ) => { 
  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    timerRef.current = setInterval(() => {
      // @ts-ignore
      props.setTime((prevTime: any) => prevTime + 1);
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const formatTime = (time: number): string => {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-lg flex justify-center items-center gap-3 dark:text-white">
        <FaClock />
        {
          // @ts-ignore
          formatTime(props?.time)
        }
      </div>
    </div>
  );
};

export default Timer;
