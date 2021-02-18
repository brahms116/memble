import { AnimationControls } from "framer-motion";

export default interface IWord {
  value: string;
  verseNumber: number;
}

export interface IWordUi extends IWord {
  control: AnimationControls;
  isHint: boolean;
}
