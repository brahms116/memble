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
  const [isBoardCleared, setIsBoardCleared] = useState(false);
  const [words, setWords] = useState<IWord[][]>(dummyWords);
  const [hasRepeated, setHasRepeated] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const resetAll = () => {
    console.log("resetting");
    setInputValue("");
    setCurrentWordIndex(0);
    setCurrentSegmentIndex(0);
    setCurrentProgressionScore(0);
    setTotalProgressionScore(0);
    setNextScholarSegment(0);
    setInitialHintShown(false);
    setIsBoardCleared(false);
    setHasRepeated(false);
    setIsGameFinished(false);
  };
  const newLetter = (letter: string, mode: string) => {
    const resObject = {
      isLetterCorrect: true,
      pointsEarned: 0,
      isFinished: false,
    };

    if (/^[a-zA-Z0-9]$/.test(letter)) {
      const wordResult = words[currentSegmentIndex][
        currentWordIndex
      ].value.match(/[a-zA-Z0-9]/g);
      const inputResult = inputValue.match(/[a-zA-Z0-9]/g);
      if (wordResult) {
        let length = inputResult ? inputResult.length : 0;
        //if the letter is correct
        if (letter.toLowerCase() === wordResult[length].toLowerCase()) {
          // if it is not the last letter
          if (length < wordResult.length - 1) {
            setInputValue((x) => x + letter);
            if (
              new RegExp(`${letter}'${wordResult[length + 1]}`, "g").test(
                words[currentSegmentIndex][currentWordIndex].value
              )
            ) {
              setInputValue((x) => x + "'");
            }
            // it is the last letter
          } else {
            //if it is the last word of the segment
            setCurrentProgressionScore((v) => v + 1);
            if (currentWordIndex === words[currentSegmentIndex].length - 1) {
              // if it is scholar mode
              if (mode === "scholar") {
                if (currentSegmentIndex + 1 === nextScholarSegment) {
                  if (hasRepeated) {
                    if (currentSegmentIndex === words.length - 1) {
                      resObject.isFinished = true;
                    } else {
                      setInitialHintShown(false);
                      setCurrentSegmentIndex((prev) => prev + 1);
                      setHasRepeated(false);
                    }
                  } else {
                    let length = 0;
                    for (let i = 0; i < currentSegmentIndex + 1; i++) {
                      length += words[i].length;
                    }
                    resObject.pointsEarned = length;
                    setCurrentSegmentIndex(0);
                    setIsBoardCleared(false);
                    setHasRepeated(true);
                  }
                } else {
                  setCurrentSegmentIndex((prev) => prev + 1);
                }
                setCurrentWordIndex(0);
              }
              //challenger mode
              else {
                if (currentSegmentIndex === words.length - 1) {
                  resObject.isFinished = true;
                } else {
                  setCurrentWordIndex(0);
                  setCurrentSegmentIndex((prev) => prev + 1);
                }
              }
              // not the last word of the segment
            } else {
              setCurrentWordIndex((prev) => prev + 1);
            }
            setInputValue("");
          }
          //the letter isn't correct
        } else {
          resObject.isLetterCorrect = false;
          return resObject;
        }
      }
    }
    return resObject;
  };

  const shownHint = () => {
    setInitialHintShown(true);
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
      isBoardCleared,
      isGameFinished,
    },
    events: {
      newLetter,
      shownHint,
      setIsBoardCleared,
      setNextScholarSegment,
      setIsGameFinished,
      setWords,
      setTotalProgressionScore,
      resetAll,
    },
  };
}
