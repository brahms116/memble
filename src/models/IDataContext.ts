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
      isBoardCleared: boolean;
      isGameFinished: boolean;
    };
    navigation: {
      selectionStage: number;
      fromTextSelectStage: number;
      toTextSelectStage: number;
      currentTextSelect: number;
    };
    gameSettings: {
      lengthMode: string;
      gameMode: string;
      fromBook: number;
      fromChapter: number;
      fromVerse: number;
      toBook: number;
      toChapter: number;
      toVerse: number;
    };
  };
  events: {
    newLetter: (letter: string) => boolean;
    shownScholarHint: () => void;
    shownChallengerHint: () => void;
    selectLengthMode: (mode: string) => void;
    confirmTextSelect: () => Promise<boolean>;
    selectGameMode: (mode: string) => void;
    boardCleared: () => void;
    quit: () => void;
    pickAnotherVerse: () => void;
    recite: () => void;
    toPickText: (currentTextSelect: number) => void;
    pickBook: (id: number) => void;
    pickChapter: (id: number) => void;
    pickVerse: (id: number) => void;
  };
}
