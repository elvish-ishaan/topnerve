import React, { useState } from 'react';

interface LengthComponentProps {
  count: number;
  totalLength: number;
}

const QuesSlider: React.FC<LengthComponentProps> = ({ count, totalLength }) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false)    //fix make paper smach on completion 
  const fullLength = totalLength -1;
  const length = (count / fullLength ) * 100; 

  return (
    <div className="w-full bg-gray-200 h-3 rounded-md border-btn-lmain">
      <div
        className=" bg-btn-main rounded-md h-full"
        style={{ width: `${length}%` }}
      />
    </div>
  );
};

export default QuesSlider;
