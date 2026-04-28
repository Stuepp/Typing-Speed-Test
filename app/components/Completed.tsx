interface CompletedProps{
  wpm: number;
  precision: number;
  correctLetters: number;
  wrongLetters: number;
  completed: boolean;
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Completed({wpm, precision, correctLetters, wrongLetters, completed, setCompleted} : CompletedProps) {
  const box_qtd = [['WPM', wpm], ['Precision', precision], ['Characters', correctLetters, wrongLetters]];

  const title = [
    'Baseline Established!',
    'Test Complete!',
    'High Score Smashed!'
  ]

  const message = [
    "You've set the BarProp. Now the real challenge begins--time to beat it.",
    'Solid run. Keep pushing to beat your high score.',
    "You're getting faster. That was incredible typing."
  ]

  return(
    <div className="flex flex-col items-center">
      
      <h1>{title.at(1)}</h1>
      <h3>{message.at(1)}</h3>

      <div className="flex gap-4">
        {box_qtd.map((e) => (
          <div key={e.at(0)} className="border-gray-600 border-2 rounded-xl p-4 flex flex-col items-start">
          <p className="text-gray-400">{e.at(0)}</p>
          <>{e.length > 2 ? <p className="font-bold text-2xl">{e.at(1)}/{e.at(2)}</p> : <p className="font-bold text-2xl">{e.at(1)}</p>}</>
        </div>
        ))}
      </div>

      <button className="bg-amber-50 rounded-xl p-2 my-8 cursor-pointer"
        onClick={() => setCompleted(false)}
      >
        <p className="text-black">Go Again</p>
      </button>
    </div>
  );
};