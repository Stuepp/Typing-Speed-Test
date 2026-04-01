'use client'

import { useEffect, useState } from "react";

import ChallengeInfo from "./components/ChallengeInfo";
import Challenge from "./components/Challenge";

export default function Home() {
  const [difficulty, setDifficulty] = useState<string>('easy'); // easy | medium | hard

  const handleDifficulty = (label: string) => {
    setDifficulty(label.toLowerCase());
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 min-h-screen w-full flex-col items-center justify-start py-32 px-8 bg-white dark:bg-black sm:items-start">
        <ChallengeInfo difficulty={difficulty} handleDifficulty={(label) => handleDifficulty(label)} />
        <Challenge difficulty={difficulty} />
      </main>
    </div>
  );
}
