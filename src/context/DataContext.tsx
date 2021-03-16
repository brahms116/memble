import { createContext } from "react";
import bible from "../models/IBook";
import IDataContext from "../models/IDataContext";
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
      gameStore.events.resetAll();
      gameStore.events.setIsGameFinished(true);
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
  const confirmTextSelect = async () => {
    navigationStore.events.changeStage(2);
    const bookQuery = `${bible[gameSettingsStore.state.fromBook].name.replace(
      " ",
      ""
    )}${gameSettingsStore.state.fromChapter + 1}:${
      gameSettingsStore.state.fromVerse + 1
    }${
      gameSettingsStore.state.lengthMode === "verse"
        ? ""
        : `-${gameSettingsStore.state.toVerse + 1}`
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
      return false;
    }
    const jsonResult = await result.json();
    const passage: string = jsonResult.passages[0];
    const wordsArr = convertToSegments(passage);
    gameStore.events.setWords(wordsArr);

    return true;
  };
  const selectGameMode = (mode: string) => {
    navigationStore.events.changeStage(3);
    gameSettingsStore.events.setGameMode(mode);
    let total = 0;
    console.log(gameStore.state.words);
    for (let i = 0; i < gameStore.state.words.length; i++) {
      if (mode === "scholar") {
        console.log(2 ** (gameStore.state.words.length - i));
        total +=
          2 ** (gameStore.state.words.length - i) *
          gameStore.state.words[i].length;
      } else {
        total += gameStore.state.words[i].length;
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
          },
        } as IDataContext
      }
    >
      {props.children}
    </dataContext.Provider>
  );
}
