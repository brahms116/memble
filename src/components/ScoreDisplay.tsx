import styles from "../styles/ScoreDisplay.module.css";

export interface ScoreDisplayProps {
  currentScore: number;
  totalScore: number;
  mode: "challenger" | "scholar";
}

export default function ScoreDisplay(props: ScoreDisplayProps) {
  return (
    <div className={styles.container}>
      <div className={styles.score}>
        {props.currentScore}/{props.totalScore}
      </div>
      <div
        className={
          styles.label +
          ` ${props.mode === "challenger" ? styles.challenger : styles.scholar}`
        }
      >
        {props.mode.toUpperCase()}
      </div>
    </div>
  );
}
