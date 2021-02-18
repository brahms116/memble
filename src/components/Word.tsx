import { AnimationControls } from "framer-motion";
import styles from "../styles/Word.module.css";

export interface WordProps {
  word: string;
  controller: AnimationControls;
  isHint?: boolean;
  isInput?: boolean;
}

export default function Word(props: WordProps) {
  return (
    <div
      className={
        styles.word +
        ` ${props.isHint ? styles.scholar : ""}` +
        ` ${props.isInput ? styles.input : ""}`
      }
    >
      {props.word.toUpperCase()}
    </div>
  );
}
