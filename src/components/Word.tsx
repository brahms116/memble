import { useSpring } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { dataContext } from "../context/DataContext";
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
  const appData = useContext(dataContext);
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
  const styleName =
    appData.state.gameSettings.gameMode === "scholar"
      ? styles.scholar
      : styles.challenger;
  return (
    <div
      style={{
        opacity: opacity,
        display: display,
      }}
      className={
        styles.word +
        ` ${props.isHint ? styleName : ""}` +
        ` ${props.isInput ? styles.input : ""}`
      }
      ref={myref}
    >
      {props.word.toUpperCase()}
    </div>
  );
}
