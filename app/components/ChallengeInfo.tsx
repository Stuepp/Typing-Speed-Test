'use client'

import { useState, useEffect } from "react"

import { useCompleted, useDifficulty, useStaterted } from "@/app/page";

import Button from "./Button";

interface ChallengeInfoProps {
  handleDifficulty: (arg0: string) => void;
  precision: number;
  wpm: number;
};

export default function ChallengeInfo({handleDifficulty, precision, wpm}: ChallengeInfoProps) {
  const {difficulty} = useDifficulty();
  const {started, setStarted} = useStaterted();
  const {setCompleted} = useCompleted();
  const [mode, SetMode] = useState<Boolean>(false);
  const [time, setTime] = useState<number>(60);

  const handleMode = () => {
    setStarted(false);
    SetMode((prev) => !prev);
    resetTimer();
  }

  const descreaseTimer = () => setTime((prev) => prev - 1);

  const resetTimer = () => setTime(60);

  const stopChallange = () => {
    setStarted(false);
    setCompleted(true);
    return;
  }
  
  useEffect(() => {
    if(!started) {
      setTime(60);
      return;
    }
    if (time <= 0) stopChallange();

    const timerId = setInterval(() => {
      descreaseTimer();
    }, 1000);

    return () => clearInterval(timerId);
  }, [time, started]);

  return(
    <div className='flex flex-row text-gray-400 gap-10 w-full justify-center'>
      <div className="flex flex-row gap-5 items items-center">
        <div className="flex flex-row gap-1.5"><p>WPM:</p> <p className="text-default font-bold">{wpm}</p></div>
        <div className="flex flex-row gap-1.5"><p>Precision:</p><p className="text-default font-bold">{precision}</p></div>
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
          <Button onClick={handleMode} label={`Timed (60s)`} active={!mode} />
          <Button onClick={handleMode} label="Passage" active={!!mode} />
        </div>
      </div>
    </div>
  );
}