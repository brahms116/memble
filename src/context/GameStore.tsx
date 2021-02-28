import { useState } from "react";
import dummyWords from "../dummywords";
import IWord from "../models/IWord";

export default function GameStore() {
  const [inputValue, setInputValue] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [currentProgressionScore, setCurrentProgressionScore] = useState(0);
  const [totalProgressionScore, setTotalProgressionScore] = useState(0);
  const [nextScholarSegment, setNextScholarSegment] = useState(0);
  const [initialHintShown, setInitialHintShown] = useState(false);
  const [words, setWords] = useState<IWord[][]>(dummyWords);
  const [hasRepeated, setHasRepeated] = useState(false);

  const newLetter = (letter: string) => {
    if (/^[a-zA-Z]$/.test(letter)) {
      const wordResult = words[currentSegmentIndex][
        currentWordIndex
      ].value.match(/[a-zA-Z]/g);
      const inputResult = inputValue.match(/[a-zA-Z]/g);
      if (wordResult) {
        let length = inputResult ? inputResult.length : 0;
        if (letter.toLowerCase() === wordResult[length]) {
          //if the letter is correct
          if (length < wordResult.length - 1) {
            // if it is not the last letter
            setInputValue((x) => x + letter);
            if (
              new RegExp(`${letter}'${wordResult[length + 1]}`, "g").test(
                words[currentSegmentIndex][currentWordIndex].value
              )
            ) {
              setInputValue((x) => x + "'");
            }
          } else {
            // it is the last letter
            if (currentWordIndex === words[currentSegmentIndex].length - 1) {
              //if it is the last word of the segment
              if (currentSegmentIndex + 1 === nextScholarSegment) {
                if (hasRepeated) {
                  setInitialHintShown(false);
                  setCurrentSegmentIndex((prev) => prev + 1);
                  setHasRepeated(false);
                } else {
                  setCurrentSegmentIndex(0);
                  setHasRepeated(true);
                }
              } else {
                setCurrentSegmentIndex((prev) => prev + 1);
              }
              setCurrentWordIndex(0);
            } else {
              // not the last word of the segment
              setCurrentWordIndex((prev) => prev + 1);
            }
            setInputValue("");
          }
        } else {
          //the letter isn't correct
          return false;
        }
      }
    }
    return true;
  };

  const shownHint = () => {
    setInitialHintShown(true);
    setNextScholarSegment(nextScholarSegment + 1);
  };
  const newSegmentComplete = () => {
    setCurrentSegmentIndex(0);
    setCurrentWordIndex(0);
  };
  return {
    state: {
      inputValue,
      currentWordIndex,
      currentProgressionScore,
      totalProgressionScore,
      currentSegmentIndex,
      words,
      nextScholarSegment,
      initialHintShown,
    },
    events: {
      newLetter,
      shownHint,
    },
  };
}
