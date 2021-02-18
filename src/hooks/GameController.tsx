import { AnimationControls, useAnimation } from "framer-motion";
import React, { useRef } from "react";
import { useState } from "react";
import Cursor from "../components/Cursor";
import Word from "../components/Word";
import WordUIElements from "../components/WordUIElements";
import IWord, { IWordUi } from "../models/IWord";
import IDataContext from "../models/IDataContext";

export default function GameController(gameController: IDataContext) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCursorActive, setIsCursorActive] = useState(false);
  const [words, setWords] = useState<IWordUi[]>([]);
  const [isCursorError, setCursorError] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputValueController = useAnimation();
  const cursorRef = useRef<HTMLDivElement>(null);
  const elements = (
    <React.Fragment>
      <WordUIElements words={words} />
      <Word
        word={gameController.state.game.inputValue}
        controller={inputValueController}
        isInput
      />

      {!isAnimating && isCursorActive && (
        <Cursor isError={isCursorError} ref={cursorRef} />
      )}
    </React.Fragment>
  );

  let animationControls: AnimationControls[] = [];
  let sum = 0;
  for (let i = 0; i < gameController.state.game.currentSegmentIndex + 1; i++) {
    sum += gameController.state.game.words[i].length;
  }
  for (let i = 0; i < sum; i++) {
    const controls = useAnimation();
    animationControls.push(controls);
  }

  // const updateWords = async (
  //   segmentIndex: number,
  //   wordIndex: number,
  //   words: IWord[][],
  //   gameMode: "scholar" | "challenger"
  // ) => {
  //   let resultWords: IWordUi[] = [];
  //   for (let i = 0; i < segmentIndex; i++) {
  //     for (let j = 0; j < wordIndex; j++) {
  //       resultWords.push({
  //         ...words[i][j],
  //         isHint: false,
  //         control: useAnimation(),
  //       });
  //     }
  //   }
  // };

  const updateCursorError = (isError: boolean) => {
    setCursorError(isError);
  };

  const updateCursorActive = (state: boolean) => {
    setIsCursorActive(state);
  };

  return {
    state: { isAnimating, elements, cursorRef },
    events: {
      updateCursorError,
      updateCursorActive,
    },
  };
}
