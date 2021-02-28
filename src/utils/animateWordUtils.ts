import { IWordUi } from "../models/IWord";
import Sleep from "./Sleep";

const animateWords = {
  showWords: async (
    setWordUI: React.Dispatch<React.SetStateAction<IWordUi[]>>,
    startIndex: number,
    length: number,
    duration: number
  ) => {
    for (let i = 0; i < length; i++) {
      setWordUI((prev) => {
        // console.log(prev);
        // console.log(`i: ${i}`);
        // console.log(`length: ${length}`);
        prev[i + startIndex].isVisible = true;
        return [...prev];
      });
      await Sleep(duration);
    }
  },
  hideWords: async (
    setWordUI: React.Dispatch<React.SetStateAction<IWordUi[]>>,
    startIndex: number,
    length: number,
    duration: number
  ) => {
    for (let i = 0; i < length; i++) {
      setWordUI((prev) => {
        console.log(prev);
        prev[startIndex - i].isVisible = false;

        return [...prev];
      });
      await Sleep(duration);
    }
  },
};

export default animateWords;
