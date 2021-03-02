import { useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import Page from "../components/Page";
import { dataContext } from "../context/DataContext";
import styles from "../styles/FinishPage.module.css";

export default function FinishPage() {
  const appData = useContext(dataContext);
  const history = useHistory();
  const recite = () => {
    appData.events.recite();
    history.push("/game");
  };
  const pickAnotherVerse = () => {
    appData.events.pickAnotherVerse();
    history.push("/");
  };
  return (
    <Page>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.title}>WELL DONE!</div>
          <div className={styles.verse}>GEN 1:1-13</div>
          <div
            className={
              styles.status +
              ` ${
                appData.state.gameSettings.gameMode === "scholar"
                  ? styles.scholar
                  : styles.challenger
              }`
            }
          >
            {appData.state.gameSettings.gameMode === "scholar"
              ? "LEARNT"
              : "RECITED"}
          </div>
          <div className={styles.sd}>
            <Button
              onClick={pickAnotherVerse}
              colorVariant="primary"
              label="pick another verse"
              fullWidth
              variant="medium"
            />
          </div>
          {appData.state.gameSettings.gameMode === "scholar" && (
            <div className={styles.sd}>
              <Button
                onClick={recite}
                colorVariant="challenger"
                label="RECITE"
                fullWidth
                variant="medium"
              />
            </div>
          )}

          <div className={styles.md}>
            <Button
              onClick={pickAnotherVerse}
              colorVariant="primary"
              label="pick another verse"
              fullWidth
              variant="large"
            />
          </div>
          {appData.state.gameSettings.gameMode === "scholar" && (
            <div className={styles.md}>
              <Button
                onClick={recite}
                colorVariant="challenger"
                label="RECITE"
                fullWidth
                variant="large"
              />
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}
