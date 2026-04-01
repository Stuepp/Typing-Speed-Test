import { useState, useEffect, Suspense } from 'react';

import { getChallenge } from '../actions/challenge';

interface ChallengeProps{
  difficulty: string;
};

export default function Challenge({difficulty='easy'}: ChallengeProps) {

  const [text, setText] = useState<string>('');
  const [charColor, setCharColor] = useState<Map<number,string>>(new Map());
  const [curLetter, setCurLetter] = useState<number>(0);

  const handleKeyDown = (e:any) => {
    console.log('Key pressed: ', e.key);
    console.log('t: ', text[curLetter] === e.key)
    console.log('cur: ', text[curLetter]);
    console.log('map: ', charColor)
    if(String(e.key).length === 1) {
      if (text[curLetter] === e.key) {
        setCharColor(charColor.set(curLetter, 'text-green-400 text-lg'))
      } else {
        setCharColor((prev) => prev.set(curLetter, 'text-red-400 text-lg'))
      }
      setCurLetter((l) => l+1)
    };

  }

  useEffect(() => {
    try{
      setCharColor(new Map())
      getChallenge(difficulty).then((t) => {
        setText(t);
        const arrT = t.split('');
        arrT.map((c, idx) => {
          setCharColor(charColor.set(idx, 'text-white'))
        });
      });
      setCurLetter(0);
    } catch(e) {
      console.error(e);
    }
  },[difficulty]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [text, curLetter])

  return(
    <Suspense fallback={<p>Loading...</p>}>
    <div className='py-10 px-8 text-start flex flex-wrap gap-0.5'>
      {text && text.split('').map((char, idx) => (
        <p key={`key-${idx}`} className={`${charColor.get(idx)}`}>{char}</p>
      ))}
    </div>
    </Suspense>
  );
}