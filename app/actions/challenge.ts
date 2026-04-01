'use server'
//import 'server-only'

import fsPromises from 'fs/promises';
import path from 'path';

/*
  Criar uma interface para o objectData, para dizer que tipo de estrutura ele vai receber e que ele vai entregar.
*/

interface level {
  id: string;
  text: string;
}

interface challenge {
  lv: level[];
};

export async function getChallenge(difficulty: string): Promise<string> {
  const filePath = path.join(process.cwd(), '/app/data.json');
  const jsonData = await fsPromises.readFile(filePath, 'utf8')
  const objectData = JSON.parse(jsonData);

  const radomInt = (min: number, max:number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const randomLevel = radomInt(1,10);

  switch (difficulty) {
    case 'easy':
      return String(objectData.easy[randomLevel]?.text);
    case 'medium':
      return String(objectData.medium[randomLevel]?.text);
    default:
      return String(objectData.hard[randomLevel]?.text);
  }
}