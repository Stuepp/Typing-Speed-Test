'use client'

import { useEffect, useState, createContext, Dispatch, SetStateAction, useContext, useRef } from "react";

import ChallengeInfo from "./components/ChallengeInfo";
import Challenge from "./components/Challenge";
import { getChallenge } from "./actions/challenge";
import Completed from "./components/Completed";

interface DifficultyContextType {
  difficulty: string; //'easy' | 'medium' | 'hard';
  setDifficulty: Dispatch<SetStateAction<string>>;
}

interface ModeContextType {
  mode: boolean; // true: timed // false: passaged
  setMode: Dispatch<SetStateAction<boolean>>;
}

interface StartedContextType {
  started: boolean;
  setStarted: Dispatch<SetStateAction<boolean>>;
}

interface CompletedContextType {
  completed: boolean;
  setCompleted: Dispatch<SetStateAction<boolean>>;
}

export const DifficultyContext = createContext<DifficultyContextType | null>(null); // easy | medium | hard
export const ModeContext = createContext<ModeContextType | null>(null); // Timed | Passage
export const StartedContext = createContext<StartedContextType | null>(null); // True | False
export const CompletedContext = createContext<CompletedContextType | null>(null); // True | False

export function useDifficulty () {
  const context = useContext(DifficultyContext);
  if(!context){
    throw new Error('useDifficulty must be used inside a DifficultyProvider');
  }
  return context;
}

export function useMode() {
  const context = useContext(ModeContext);
  if(!context){
    throw new Error('useMode must be used inside a ModeProvider');
  }
  return context;
}

export function useStaterted() {
  const context = useContext(StartedContext);
  if(!context) {
    throw new Error('useStarted must be used inside a StartedProvider');
  }
  return context;
}

export function useCompleted() {
  const context = useContext(CompletedContext);
  if(!context) {
    throw new Error('useCompleted must be used inside a StartedProvider');
  }
  return context;
}

export default function Home() {
  // Challenge Info
  const [precision, setPrecision] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);
  // Challenge - Context
  const [difficulty, setDifficulty] = useState<string>('easy'); // easy | medium | hard
  const [mode, setMode] = useState<boolean>(true);
  const [started, setStarted] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(true);
  // Challenge
  const [charColor, setCharColor] = useState<Map<number,string>>(new Map());
  const [text, setText] = useState<string>('');
  const [curLetter, setCurLetter] = useState<number>(0);
  const [arrT, setArrT] = useState<string[]>([]);

  const [correctLetters, setCorrectLetters] = useState<number>(0);
  const [incorrectLetters, setIncorrectLetters] = useState<number>(0);
  let words = useRef<number>(0);
  let initialTime = useRef<number>(0);
  let finalTime = useRef<number>(0);
 
  const handleDifficulty = (label:string) => {
    setDifficulty(label);
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
      initialTime.current = Date.now();
    } catch(e) {
      console.error(e);
    }
  }

  const results = () => {
    finalTime.current = Date.now();
    const precision = (correctLetters / (correctLetters + incorrectLetters)) * 100;
    setPrecision(precision.toFixed(2) as unknown as number);
    const time = (finalTime.current - initialTime.current) / 1000 / 60; // time in minutes.
    const wordsTimed = words.current / time;
    wordsTimed === 0 
      ? setWpm(1)
      : setWpm(wordsTimed.toFixed(2) as unknown as number);
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
    <StartedContext value={{started, setStarted}}>
    <CompletedContext value={{completed, setCompleted}}>
    <DifficultyContext value={{difficulty, setDifficulty}}>
    <ModeContext value={{mode, setMode}}>
      <main className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
        <div className={`flex flex-1 justify-center ${completed ? 'visible' : 'hidden'}`}>
          <Completed
            wpm={wpm}
            precision={precision}
            correctLetters={correctLetters}
            wrongLetters={incorrectLetters}
            setCorrectLetters={setCorrectLetters}
            setIncorrectLetters={setIncorrectLetters}
            words={words}
          />
        </div>

        <div className={`flex flex-1 min-h-screen w-full flex-col items-center justify-start py-32 px-8 bg-white dark:bg-black sm:items-start ${completed ? 'hidden' : 'visible'}`}>
          <ChallengeInfo
            handleDifficulty={(label: string) => handleDifficulty(label)}
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
              charColor={charColor}
              setCharColor={setCharColor}
              setCurLetter={setCurLetter}
              text={text}
              curLetter={curLetter}
              setCorrectLetters={setCorrectLetters}
              setIncorrectLetters={setIncorrectLetters}
              words={words}
            />
          </div>
        </div>
      </main>
    </ModeContext>
    </DifficultyContext>
    </CompletedContext>
    </StartedContext>
  );
}
