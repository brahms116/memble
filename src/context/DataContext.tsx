import { createContext } from "react";
import IDataContext from "../models/IDataContext";
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
  const confirmTextSelect = () => {
    navigationStore.events.changeStage(2);
  };
  const selectGameMode = (mode: string) => {
    navigationStore.events.changeStage(3);
    gameSettingsStore.events.setGameMode(mode);
  };
  const boardCleared = () => {
    gameStore.events.setIsBoardCleared(true);
  };
  const pickAnotherVerse = () => {
    navigationStore.events.changeStage(0);
  };
  const recite = () => {
    gameSettingsStore.events.setGameMode("challenger");
    navigationStore.events.changeStage(3);
  };
  const quit = () => {
    gameStore.events.resetAll();
    pickAnotherVerse();
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
          },
        } as IDataContext
      }
    >
      {props.children}
    </dataContext.Provider>
  );
}
