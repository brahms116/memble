import IWord from "./IWord";

export default interface IDataContext {
  state: {
    game: {
      inputValue: string;
      currentWordIndex: number;
      currentSegmentIndex: number;
      currentProgressionScore: number;
      totalProgressionScore: number;
      initialHintShown: boolean;
      nextScholarSegment: number;
      words: IWord[][];
    };
  };
  events: {
    newLetter: (letter: string) => boolean;
    shownHint: () => void;
  };
}
