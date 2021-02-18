import IWord from "./IWord";

export default interface IGameController {
  state: {
    isAnimating: boolean;
    elements: React.ReactNode;
    inputRef: React.RefObject<HTMLDivElement>;
  };
  events: {
    updateCurrentInputValue: (value: string) => void;
    updateCursorState: (value: "error" | "normal" | "none") => void;
    updateCurrentIndex: (
      segmentIndex: number,
      wordIndex: number,
      words: IWord[][]
    ) => void;
    animateHint: () => void;
  };
}
