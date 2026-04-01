'use client'

import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [highestScore, setHighestScore] = useState<number>(0);

  return(
    <div className="px-20 pt-5 flex justify-between items-center bg-black">
      <Image
        src={'/images/logo-large.svg'}
        width={400}
        height={100}
        alt="logo"
      />
      <div>
        <div className="flex flex-row gap-1.5 items-center">
          <Image
            src={'/images/icon-personal-best.svg'}
            width={25}
            height={25}
            alt="trophy"
          />
          <p className="text-gray-400">Personal Best:</p>
          <p className="text-white">{highestScore} WPM</p>
        </div>
      </div>
    </div>
  );
}