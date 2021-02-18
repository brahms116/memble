import { AnimationControls, motion } from "framer-motion";
import styles from "../styles/VerseMarker.module.css";

export interface VerseMarkerProps {
  verseNumber: number;
  controller: AnimationControls;
}

export default function VerseMarker(props: VerseMarkerProps) {
  return (
    <motion.div className={styles.marker} animate={props.controller}>
      v{props.verseNumber}
    </motion.div>
  );
}
