'use client'

import { useEffect, useState } from "react";

import ChallengeInfo from "./components/ChallengeInfo";
import Challenge from "./components/Challenge";
import { getChallenge } from "./actions/challenge";
import Completed from "./components/Completed";

export default function Home() {
  // Challenge Info
  const [precision, setPrecision] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);
  // Challenge
  const [difficulty, setDifficulty] = useState<string>('easy'); // easy | medium | hard
  const [charColor, setCharColor] = useState<Map<number,string>>(new Map());
  const [text, setText] = useState<string>('');
  const [curLetter, setCurLetter] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(true);
  const [arrT, setArrT] = useState<string[]>([]);

  const [correctLetters, setCorrectLetters] = useState<number>(0);
  const [incorrectLetters, setIncorrectLetters] = useState<number>(0);
  const [words, setWords] = useState<number>(0);
  const [initialTime, setInitialTime] = useState<number>(0);
  const [finalTime, setFinalTime] = useState<number>(0);
 
  const handleDifficulty = (label: string) => {
    setDifficulty(label.toLowerCase());
    setStarted(false);
    // set Text color to white.
    try{
      setCharColor(new Map());
      getChallenge(difficulty).then((text) => {
        setText(text);
        setArrT(text.split(''));
        arrT.map((c, idx) => {
          setCharColor(charColor.set(idx, 'text-default'))
        });
      });
      setCurLetter(0); // sets current letter index to 0. -- Where the player starts.
      setInitialTime(Date.now());
    } catch(e) {
      console.error(e);
    }
  }

  const results = () => {
    setFinalTime(Date.now());
    const precision = (correctLetters / (correctLetters + incorrectLetters)) * 100;
    setPrecision(precision.toFixed(2) as unknown as number);
    const time = (finalTime - initialTime) / 1000 / 60; // time in minutes.
    const wpm = words / -time;
    wpm === 0 
      ? setWpm(1)
      : setWpm(wpm.toFixed(2) as unknown as number);

    setWords(0);
    setCorrectLetters(0);
    setIncorrectLetters(0);
  };

  useEffect(() => {
    if(!started) return;
    if(curLetter === arrT.length) {
      setStarted(false);
      results();
      setCompleted(true);
      
    }
  },[curLetter]);

  // on start up
  useEffect(() => {
    handleDifficulty(difficulty);
  }, [])

  return (
    <main className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <div className={`flex flex-1 justify-center ${completed ? 'visible' : 'hidden'}`}>
        <Completed
          wpm={wpm}
          precision={precision}
          correctLetters={correctLetters}
          wrongLetters={incorrectLetters}
          completed={completed}
          setCompleted={setCompleted}
        />
      </div>
      
      <div className={`flex flex-1 min-h-screen w-full flex-col items-center justify-start py-32 px-8 bg-white dark:bg-black sm:items-start ${completed ? 'hidden' : 'visible'}`}>
        <ChallengeInfo
          started={started}
          difficulty={difficulty}
          handleDifficulty={(label) => handleDifficulty(label)}
          precision={precision}
          wpm={wpm}
        />
        
        <div className="relative w-full">
          <button
            onClick={() => setStarted(true)}
            className={`bg-cyan-400 text-default p-3 rounded-xl absolute left-1/2 top-1/2 cursor-pointer z-50 ${started && !completed ? 'hidden' : 'visible'} `}
          >
            Start Typing Test
          </button>
          <Challenge
            difficulty={difficulty}
            charColor={charColor}
            setCharColor={setCharColor}
            setCurLetter={setCurLetter}
            text={text}
            curLetter={curLetter}
            started={started}
            setCorrectLetters={setCorrectLetters}
            setIncorrectLetters={setIncorrectLetters}
            setWords={setWords}
          />
        </div>
      </div>
    </main>
  );
}
