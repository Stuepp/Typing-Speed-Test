'use client'

import { lazy, useState } from "react"

import Button from "./Button";

interface ChallengeInfoProps {
  difficulty: string;
  handleDifficulty: (arg0: string) => void;
};


export default function ChallengeInfo({difficulty='easy', handleDifficulty}: ChallengeInfoProps) {
  
  const [mode, SetMode] = useState<Boolean>(false);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [time, setTime] = useState<number>(60);

  const handleMode = () => {
    SetMode((prev) => !prev);
  }
  

  return(
    <div className='flex flex-row text-gray-400 gap-10 w-full justify-center'>
      <div className="flex flex-row gap-5 items items-center">
        <div className="flex flex-row gap-1.5"><p>WPM:</p> <p className="text-default font-bold">{wpm}</p></div>
        <div className="flex flex-row gap-1.5"><p>Accuracy:</p><p className="text-default font-bold">{accuracy}</p></div>
        <div className="flex flex-row gap-1.5"><p>Time:</p><p className="text-default font-bold">{time}</p></div>
      </div>

      <div className="flex flex-row gap-5">
        <div className="flex flex-row items-center gap-1">
          <p>Difficulty: </p>
          <Button onClick={() => handleDifficulty('easy')} label="Easy" active={difficulty === 'easy'} />
          <Button onClick={() => handleDifficulty('medium')} label="Medium" active={difficulty === 'medium'} />
          <Button onClick={() => handleDifficulty('hard')} label="Hard" active={difficulty === 'hard'} />
        </div>
        <div className="flex flex-row items-center gap-0.5">
          <p>Mode:</p>
          <Button onClick={handleMode} label={`Timed (${time}s)`} active={!mode} />
          <Button onClick={handleMode} label="Passage" active={!!mode} />
        </div>
      </div>
    </div>
  );
}