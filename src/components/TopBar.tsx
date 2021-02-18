import styles from "../styles/TopBar.module.css";
import IconButton from "./IconButton";
import ScoreDisplay from "./ScoreDisplay";
import { ReactComponent as icon } from "../media/MenuIcon.svg";
export default function TopBar() {
  return (
    <div className={styles.container}>
      <IconButton icon={icon} />
      <ScoreDisplay mode="challenger" totalScore={100} currentScore={35} />
    </div>
  );
}
