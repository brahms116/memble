import styles from "../styles/TopBar.module.css";
import IconButton from "./IconButton";
import ScoreDisplay from "./ScoreDisplay";
import { ReactComponent as icon } from "../media/MenuIcon.svg";
import { useContext } from "react";
import { dataContext } from "../context/DataContext";
import { useHistory } from "react-router-dom";
export default function TopBar() {
  const appData = useContext(dataContext);
  const history = useHistory();
  return (
    <header>
      <nav className={styles.container}>
        <IconButton
          icon={icon}
          onClick={() => {
            history.push("/pause");
          }}
        />
        <ScoreDisplay
          mode={
            appData.state.gameSettings.gameMode === "scholar"
              ? "scholar"
              : "challenger"
          }
          totalScore={appData.state.game.totalProgressionScore}
          currentScore={appData.state.game.currentProgressionScore}
        />
      </nav>
    </header>
  );
}
