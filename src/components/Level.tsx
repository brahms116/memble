import styles from "../styles/Level.module.css";

export interface LevelProps {
  display?: boolean;
  level: number;
}

export default function Level(props: LevelProps) {
  return (
    <div className={styles.level}>
      <div
        className={
          styles.outer_circle + ` ${props.display ? styles.display : ""}`
        }
      ></div>
      <div
        className={
          styles.inner_circle + ` ${props.display ? styles.display : ""}`
        }
      ></div>
      <div className={styles.text + ` ${props.display ? styles.display : ""}`}>
        {props.level}
      </div>
    </div>
  );
}
