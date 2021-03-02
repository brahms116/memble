import { useState } from "react";

export default function GameSettingsStore() {
  const [lengthMode, setLengthMode] = useState("passage");
  const [gameMode, setGameMode] = useState("scholar");
  const [fromBook, setFromBook] = useState(0);
  const [fromChapter, setFromChapter] = useState(0);
  const [fromVerse, setFromVerse] = useState(0);
  const [toBook, setToBook] = useState(0);
  const [toChapter, setToChapter] = useState(0);
  const [toVerse, setToVerse] = useState(0);
  const resetAll = () => {
    setGameMode("scholar");
    setLengthMode("passage");
    resetText();
  };
  const resetText = () => {
    setFromBook(0);
    setFromChapter(0);
    setFromVerse(0);
    setToBook(0);
    setToChapter(0);
    setToVerse(0);
  };

  return {
    state: {
      lengthMode,
      gameMode,
      fromBook,
      fromChapter,
      fromVerse,
      toBook,
      toChapter,
      toVerse,
    },
    events: {
      setLengthMode,
      setGameMode,
      setFromBook,
      setFromChapter,
      setFromVerse,
      setToBook,
      setToChapter,
      setToVerse,
      resetText,
      resetAll,
    },
  };
}
