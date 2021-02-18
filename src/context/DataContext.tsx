import { createContext } from "react";
import IDataContext from "../models/IDataContext";
import GameStore from "./GameStore";

export const dataContext = createContext({} as IDataContext);

export default function DataContextProvider(props: {
  children: React.ReactNode;
}) {
  const gameStore = GameStore();

  const newLetter = (letter: string) => {
    console.log(letter);
    return gameStore.events.newLetter(letter);
  };
  return (
    <dataContext.Provider
      value={
        {
          state: { game: { ...gameStore.state } },
          events: { newLetter },
        } as IDataContext
      }
    >
      {props.children}
    </dataContext.Provider>
  );
}
