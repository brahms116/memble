import { useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Word.module.css";

export interface WordProps {
  word: string;
  isVisible: boolean;
  isHint?: boolean;
  isInput?: boolean;
}

export default function Word(props: WordProps) {
  const myref = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(props.isVisible ? 1 : 0);
  const opacityMotion = useSpring(props.isVisible ? 1 : 0);
  const [display, setDisplay] = useState(props.isVisible ? "block" : "none");

  useEffect(() => {
    opacityMotion.set(props.isVisible ? 1 : 0);
  }, [props.isVisible]);

  useEffect(() => {
    const update = opacityMotion.onChange(() => {
      setOpacity(opacityMotion.get());
      if (opacityMotion.get() === 0) {
        setDisplay("none");
      } else {
        setDisplay("block");
      }
    });
    return () => {
      update();
    };
  }, []);

  return (
    <div
      style={{
        opacity: opacity,
        display: display,
      }}
      className={
        styles.word +
        ` ${props.isHint ? styles.scholar : ""}` +
        ` ${props.isInput ? styles.input : ""}`
      }
      ref={myref}
    >
      {props.word.toUpperCase()}
    </div>
  );
}
