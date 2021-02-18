import { useState } from "react";
import dummyWords from "../dummywords";
import IWord from "../models/IWord";

export default function GameStore() {
  const [inputValue, setInputValue] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [currentProgressionScore, setCurrentProgressionScore] = useState(0);
  const [totalProgressionScore, setTotalProgressionScore] = useState(0);
  const [words, setWords] = useState<IWord[][]>(dummyWords);

  const newLetter = (letter: string) => {
    setInputValue((x) => x + letter);
    return true;
  };
  return {
    state: {
      inputValue,
      currentWordIndex,
      currentProgressionScore,
      totalProgressionScore,
      currentSegmentIndex,
      words,
    },
    events: {
      newLetter,
    },
  };
}
