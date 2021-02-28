import { createContext } from "react";
import IDataContext from "../models/IDataContext";
import GameStore from "./GameStore";

export const dataContext = createContext({} as IDataContext);

export default function DataContextProvider(props: {
  children: React.ReactNode;
}) {
  const gameStore = GameStore();

  const newLetter = (letter: string) => {
    return gameStore.events.newLetter(letter);
  };

  const shownHint = () => {
    gameStore.events.shownHint();
  };
  return (
    <dataContext.Provider
      value={
        {
          state: { game: { ...gameStore.state } },
          events: { newLetter, shownHint },
        } as IDataContext
      }
    >
      {props.children}
    </dataContext.Provider>
  );
}
