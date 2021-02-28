import { AnimationControls, motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "../styles/VerseMarker.module.css";

export interface VerseMarkerProps {
  verseNumber: number;
  isVisible: boolean;
}

export default function VerseMarker(props: VerseMarkerProps) {
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
    <div className={styles.marker} style={{ opacity, display }}>
      v{props.verseNumber}
    </div>
  );
}
