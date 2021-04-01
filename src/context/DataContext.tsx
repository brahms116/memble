import { createContext } from "react";
import bible from "../models/IBook";
import IDataContext from "../models/IDataContext";
import IWord from "../models/IWord";
import convertToSegments from "../utils/converToSegments";
import GameSettingsStore from "./GameSettingsStore";
import GameStore from "./GameStore";
import NavigationStore from "./NavigationStore";

export const dataContext = createContext({} as IDataContext);

export default function DataContextProvider(props: {
  children: React.ReactNode;
}) {
  const gameStore = GameStore();
  const navigationStore = NavigationStore();
  const gameSettingsStore = GameSettingsStore();

  const newLetter = (letter: string) => {
    const result = gameStore.events.newLetter(
      letter,
      gameSettingsStore.state.gameMode
    );
    if (result.isFinished) {
      navigationStore.events.changeStage(4);
      gameStore.events.setIsGameFinished(true);
      //   gameStore.events.resetAll();
    }
    return result.isLetterCorrect;
  };
  const shownScholarHint = () => {
    gameStore.events.shownHint();
    gameStore.events.setNextScholarSegment((prev) => prev + 1);
  };
  const shownChallengerHint = () => {
    gameStore.events.shownHint();
  };
  const selectLengthMode = (mode: string) => {
    navigationStore.events.changeStage(1);
    gameSettingsStore.events.setLengthMode(mode);
  };
  const confirmTextSelect = async (customObj?: {
    lengthMode: string;
    fromBook: number;
    fromChapter: number;
    fromVerse: number;
    toVerse: number;
  }) => {
    const dataObj = customObj ? customObj : gameSettingsStore.state;
    navigationStore.events.changeStage(2);
    const bookQuery = `${bible[dataObj.fromBook].name.replace(" ", "")}${
      dataObj.fromChapter + 1
    }:${dataObj.fromVerse + 1}${
      dataObj.lengthMode === "verse" ? "" : `-${dataObj.toVerse + 1}`
    }`;
    const url = `https://api.esv.org/v3/passage/text/?q=${bookQuery}&include-passage-references=false&include-first-verse-numbers=false&include-footnotes=false&include-headings=false&include-short-copyright=false&include-selahs=false&indent-paragraphs=0&indent-poetry=false&indent-psalm-doxology=0`;
    // console.log(url);
    const result = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Token ede66b576c874455771b9ef035e3ed2be17370f2",
      },
    });
    if (!result.ok) {
      console.log("errror");
      console.log(result.blob());
      return { ok: false, payload: null };
    }
    const jsonResult = await result.json();
    const passage: string = jsonResult.passages[0];
    const wordsArr = convertToSegments(passage);
    gameStore.events.setWords(wordsArr);

    return { payload: wordsArr, ok: true };
  };
  const selectGameMode = (mode: string, arr?: IWord[][] | null) => {
    navigationStore.events.changeStage(3);
    const wordArr = arr ? arr : gameStore.state.words;
    gameSettingsStore.events.setGameMode(mode);
    let total = 0;
    for (let i = 0; i < wordArr.length; i++) {
      if (mode === "scholar") {
        total += (wordArr.length - i + 1) * wordArr[i].length;
      } else {
        total += wordArr[i].length;
      }
    }
    gameStore.events.setTotalProgressionScore(total);
  };
  const boardCleared = () => {
    gameStore.events.setIsBoardCleared(true);
  };
  const pickAnotherVerse = () => {
    navigationStore.events.changeStage(0);
    gameStore.events.resetAll();
  };
  const recite = () => {
    gameStore.events.resetAll();
    selectGameMode("challenger");
  };
  const quit = () => {
    gameStore.events.resetAll();
    pickAnotherVerse();
  };
  const toPickText = (currentTextSelect: number) => {
    navigationStore.events.setCurrentTextSelect(currentTextSelect);
  };
  const pickBook = (id: number) => {
    if (navigationStore.state.currentTextSelect < 3) {
      gameSettingsStore.events.setFromBook(id);
      navigationStore.events.setFromTextSelectStage(2);
      // if (
      //   navigationStore.state.toTextSelectStage === -1 ||
      //   gameSettingsStore.state.toBook < id
      // ) {
      gameSettingsStore.events.setToBook(id);
      navigationStore.events.setToTextSelectStage(1);
      // }
    } else {
      gameSettingsStore.events.setToBook(id);
      navigationStore.events.setToTextSelectStage(
        navigationStore.state.fromTextSelectStage > 2 ? 2 : 1
      );
    }
  };
  const pickChapter = (id: number) => {
    if (navigationStore.state.currentTextSelect < 3) {
      gameSettingsStore.events.setFromChapter(id);
      navigationStore.events.setFromTextSelectStage(4);
      // if (
      //   navigationStore.state.toTextSelectStage === 1 ||
      //   gameSettingsStore.state.toChapter > id
      // ) {
      //   if (
      //     gameSettingsStore.state.toBook === gameSettingsStore.state.fromBook
      //   ) {
      gameSettingsStore.events.setToChapter(id);
      navigationStore.events.setToTextSelectStage(3);
      //   } else {
      //     navigationStore.events.setToTextSelectStage(2);
      //   }
      // }
    } else {
      gameSettingsStore.events.setToChapter(id);
      navigationStore.events.setToTextSelectStage(
        navigationStore.state.fromTextSelectStage > 4 ? 4 : 3
      );
    }
  };
  const pickVerse = (id: number) => {
    if (navigationStore.state.currentTextSelect < 3) {
      gameSettingsStore.events.setFromVerse(id);
      navigationStore.events.setFromTextSelectStage(5);
      // if (
      //   navigationStore.state.toTextSelectStage === 3 ||
      //   gameSettingsStore.state.toVerse > id
      // ) {
      //   if (
      //     gameSettingsStore.state.toBook === gameSettingsStore.state.fromBook &&
      //     gameSettingsStore.state.toChapter ===
      //       gameSettingsStore.state.fromChapter
      //   ) {
      gameSettingsStore.events.setToVerse(id);
      navigationStore.events.setToTextSelectStage(5);
      // } else {
      //   navigationStore.events.setToTextSelectStage(4);
      // }
      // }
    } else {
      gameSettingsStore.events.setToVerse(id);
      navigationStore.events.setToTextSelectStage(5);
    }
  };

  const fromURL = async (
    textMode: string,
    gameMode: string,
    book: number,
    chapter: number,
    verse: number,
    verseEnd?: number
  ) => {
    gameSettingsStore.events.setLengthMode(textMode);
    gameSettingsStore.events.setFromBook(book);
    gameSettingsStore.events.setFromChapter(chapter);
    gameSettingsStore.events.setFromVerse(verse);
    gameSettingsStore.events.setToVerse(verseEnd ? verseEnd : 0);
    const result = await confirmTextSelect({
      lengthMode: textMode,
      fromBook: book,
      fromVerse: verse,
      fromChapter: chapter,
      toVerse: verseEnd ? verseEnd : 0,
    });
    if (!result.ok) return false;
    selectGameMode(gameMode, result.payload);
    return true;
  };
  return (
    <dataContext.Provider
      value={
        {
          state: {
            game: { ...gameStore.state },
            navigation: { ...navigationStore.state },
            gameSettings: { ...gameSettingsStore.state },
          },
          events: {
            newLetter,
            shownScholarHint,
            shownChallengerHint,
            selectLengthMode,
            confirmTextSelect,
            selectGameMode,
            boardCleared,
            quit,
            pickAnotherVerse,
            recite,
            toPickText,
            pickBook,
            pickChapter,
            pickVerse,
            showHint: gameStore.events.showHint,
            fromURL,
          },
        } as IDataContext
      }
    >
      {props.children}
    </dataContext.Provider>
  );
}
