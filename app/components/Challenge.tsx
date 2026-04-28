import { useState, useEffect, Suspense } from 'react';

interface ChallengeProps{
  difficulty: string;
  charColor: Map<number, string>;
  setCharColor: React.Dispatch<React.SetStateAction<Map<number, string>>>;
  setCurLetter: React.Dispatch<React.SetStateAction<number>>;
  text: string;
  curLetter: number;
  started: boolean;
  setCorrectLetters: React.Dispatch<React.SetStateAction<number>>;
  setIncorrectLetters: React.Dispatch<React.SetStateAction<number>>;
  setWords: React.Dispatch<React.SetStateAction<number>>;
};

export default function Challenge({difficulty='easy', charColor, setCharColor, setCurLetter, text='', curLetter, started, setCorrectLetters, setIncorrectLetters, setWords}: ChallengeProps) {

  const handleKeyDown = (e:any) => {
    // for debugging purposes.
    /*
      //console.log('Key pressed: ', e.key);
      //console.log('t: ', text[curLetter] === e.key)
      //console.log('cur: ', text[curLetter]);
      //console.log('map: ', charColor)
    */
    // ----
    if(String(e.key).length === 1) {
      if (text[curLetter] === e.key) {
        setCharColor(charColor.set(curLetter, 'text-correct'))
        setCorrectLetters((l) => l+1)
      } else {
        setCharColor((prev) => prev.set(curLetter, 'text-incorrect'))
        setIncorrectLetters((l) => l+1)
      }
      setCurLetter((l) => l+1)
      if(e.key === ' ') setWords((w) => w+1);
    };
  }

  useEffect(() => {
    if(!started) return;
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [text, curLetter, started])

  return(
    <Suspense fallback={<p>Loading...</p>}>
    <div className={`py-10 px-8 text-start flex flex-wrap gap-0.5 ${started ? '' : 'blur-sm'}`}>
      {text && text.split('').map((char, idx) => (
        <p key={`key-${idx}`} className={`${charColor.get(idx)}`}>{char}</p>
      ))}
    </div>
    </Suspense>
  );
}