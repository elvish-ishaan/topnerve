import React from 'react';
import TextTransition, { presets } from 'react-text-transition';

const TEXTS = ['Practice', 'Struggle', 'Tough', 'Success'];

export  const TextDec = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      2000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div className=' p-4'>
        <h1 className=' text-8xl font-medium dark:text-white'>
        <TextTransition springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>
    </h1>
    </div>
  );
};