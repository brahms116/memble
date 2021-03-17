import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Cursor from "../components/Cursor";
import Word from "../components/Word";
import WordUIElements from "../components/WordUIElements";
import IWord, { IWordUi } from "../models/IWord";
import IDataContext from "../models/IDataContext";
import animateWords from "../utils/animateWordUtils";
import Sleep from "../utils/Sleep";
import { useHistory } from "react-router-dom";

export default function GameController(
  appData: IDataContext,
  isAwaitingCover: boolean
) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCursorActive, setIsCursorActive] = useState(false);
  const [words, setWords] = useState<IWordUi[]>([]);
  const [isCursorError, setCursorError] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const elements = (
    <React.Fragment>
      <WordUIElements words={words} />

      <Word word={appData.state.game.inputValue} isVisible isInput />

      <Cursor
        isError={isCursorError}
        ref={cursorRef}
        isVisible={!isAnimating && isCursorActive}
      />
    </React.Fragment>
  );
  const updateCursorActive = (state: boolean) => {
    setIsCursorActive(state);
  };
  const displayChallengerHint = async () => {
    setIsAnimating(true);
    setWords([]);
    let arr: IWordUi[] = [];
    arr.push({
      value: appData.state.game.words[0][0].value,
      isHint: true,
      verseNumber: appData.state.game.words[0][0].verseNumber,
      isVisible: false,
    });
    arr.push({
      value: appData.state.game.words[0][1].value,
      isHint: true,
      verseNumber: appData.state.game.words[0][1].verseNumber,
      isVisible: false,
    });
    setWords(arr);
    await Sleep(700);
    await animateWords.showWords(setWords, 0, 2, 200);
    await animateWords.hideWords(setWords, 1, 2, 200);
    setWords([]);
    setIsAnimating(false);
    appData.events.shownChallengerHint();
  };

  const displayScholarHint = async (
    segmentIndex: number,
    wordIndex: number
  ) => {
    setIsAnimating(true);
    let result: IWordUi[] = [];
    for (const i of appData.state.game.words[segmentIndex]) {
      result.push({
        value: i.value,
        verseNumber: i.verseNumber,
        isVisible: false,
        isHint: true,
      });
    }
    setWords((prev) => prev.concat(result));
    let startIndex = 0;
    for (let i = 0; i < segmentIndex; i++) {
      startIndex += appData.state.game.words[i].length;
    }
    startIndex += wordIndex;
    await animateWords.showWords(
      setWords,
      startIndex,
      appData.state.game.words[segmentIndex].length,
      400
    );
    await Sleep(1000);
    await animateWords.hideWords(
      setWords,
      startIndex + appData.state.game.words[segmentIndex].length - 1,
      appData.state.game.words[segmentIndex].length,
      400
    );
    setWords((prev) => {
      for (let i = 0; i < appData.state.game.words[segmentIndex].length; i++) {
        prev.pop();
      }
      return [...prev];
    });
    setIsAnimating(false);
    appData.events.shownScholarHint();
  };

  const clearBoard = async (semgmentIndex: number) => {
    setIsAnimating(true);
    let length = 0;
    for (let i = 0; i < semgmentIndex + 1; i++) {
      length += appData.state.game.words[i].length;
    }
    //have to set starting index as length-2 because the last word of the segment isn't part of the words:IWordUI array
    await animateWords.hideWords(setWords, length - 2, length - 1, 200);
    setWords([]);
    let arr: IWordUi[] = [];
    arr.push({
      value: appData.state.game.words[0][0].value,
      isHint: true,
      verseNumber: appData.state.game.words[0][0].verseNumber,
      isVisible: false,
    });
    arr.push({
      value: appData.state.game.words[0][1].value,
      isHint: true,
      verseNumber: appData.state.game.words[0][1].verseNumber,
      isVisible: false,
    });
    setWords(arr);
    await Sleep(700);
    await animateWords.showWords(setWords, 0, 2, 200);
    await animateWords.hideWords(setWords, 1, 2, 200);
    setWords([]);
    setIsAnimating(false);
    appData.events.boardCleared();
  };
  const displayWords = (segmentIndex: number, wordIndex: number) => {
    let result: IWordUi[] = [];
    for (let i = 0; i < segmentIndex + 1; i++) {
      const length =
        i === segmentIndex ? wordIndex : appData.state.game.words[i].length;
      for (let j = 0; j < length; j++) {
        result.push({
          value: appData.state.game.words[i][j].value,
          verseNumber: appData.state.game.words[i][j].verseNumber,
          isVisible: true,
          isHint: false,
        });
      }
    }
    return result;
  };
  useEffect(() => {
    return () => {
      appData.events.boardCleared();
      //challenger hint here so that scholar segement doesn't move up?
      // appData.events.shownChallengerHint();
    };
  }, []);
  useEffect(() => {
    if (appData.state.game.isGameFinished) {
      console.log("pushing");
      history.push("/finish");
    }
  }, [appData.state.game.isGameFinished]);
  useEffect(() => {
    //If it is scholar mode
    if (appData.state.gameSettings.gameMode === "scholar") {
      if (
        !appData.state.game.isBoardCleared &&
        appData.state.game.currentSegmentIndex === 0 &&
        appData.state.game.currentWordIndex === 0 &&
        appData.state.game.nextScholarSegment > 0
      ) {
        clearBoard(appData.state.game.nextScholarSegment - 1);
      } else {
        setWords(
          displayWords(
            appData.state.game.currentSegmentIndex,
            appData.state.game.currentWordIndex
          )
        );
        if (!isAwaitingCover) {
          if (
            !appData.state.game.initialHintShown &&
            appData.state.game.currentWordIndex === 0 &&
            appData.state.game.currentSegmentIndex ===
              appData.state.game.nextScholarSegment
          )
            displayScholarHint(
              appData.state.game.currentSegmentIndex,
              appData.state.game.currentWordIndex
            );
        }
      }
    }
    // if it is challenger
    else {
      if (!isAwaitingCover) {
        if (!appData.state.game.initialHintShown) {
          displayChallengerHint();
        } else {
          setWords(
            displayWords(
              appData.state.game.currentSegmentIndex,
              appData.state.game.currentWordIndex
            )
          );
        }
      }
    }
  }, [
    appData.state.game.currentSegmentIndex,
    appData.state.game.currentWordIndex,
    appData.state.game.initialHintShown,
    appData.state.game.isBoardCleared,
    isAwaitingCover,
  ]);

  const newLetter = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.value);
    if (!isAnimating) {
      const result = appData.events.newLetter(e.currentTarget.value);
      setCursorError(!result);
    }
  };

  return {
    state: { isAnimating, elements, cursorRef },
    events: {
      updateCursorActive,
      newLetter,
    },
  };
}
