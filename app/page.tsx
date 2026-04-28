'use client'

import { useEffect, useState } from "react";

import ChallengeInfo from "./components/ChallengeInfo";
import Challenge from "./components/Challenge";
import { getChallenge } from "./actions/challenge";

export default function Home() {
  const [difficulty, setDifficulty] = useState<string>('easy'); // easy | medium | hard
  const [charColor, setCharColor] = useState<Map<number,string>>(new Map());
  const [text, setText] = useState<string>('');
  const [curLetter, setCurLetter] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  const [arrT, setArrT] = useState<string[]>([]);

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
    } catch(e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if(!started) return;
    if(curLetter === arrT.length) setStarted(false);
  },[curLetter]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 min-h-screen w-full flex-col items-center justify-start py-32 px-8 bg-white dark:bg-black sm:items-start">
        <ChallengeInfo difficulty={difficulty} handleDifficulty={(label) => handleDifficulty(label)} />
        
        <div className="relative w-full">
          <button
            onClick={() => setStarted(true)}
            className={`bg-cyan-400 text-default p-3 rounded-xl absolute left-1/2 top-1/2 cursor-pointer z-50 ${started ? 'hidden' : 'visible'} `}
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
          />
        </div>
      </main>
    </div>
  );
}
