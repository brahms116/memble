import { useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import Page from "../components/Page";
import { dataContext } from "../context/DataContext";
import styles from "../styles/ModePage.module.css";

export default function ModePage() {
  const appData = useContext(dataContext);
  const history = useHistory();
  return (
    <Page>
      <div className={styles.page}>
        <div className={styles.title}>PLAY AS A...</div>
        <div className={styles.option + ` ${styles.scholar}`}>
          <div>SCHOLAR</div>
          <div className={styles.details}>
            I WANT TO MEMORISE THE VERSE/PASSAGE
          </div>
          <Button
            onClick={() => {
              appData.events.selectGameMode("scholar");
              history.push("/game");
            }}
            variant="medium"
            colorVariant="scholar"
            label="LEARN"
          />
        </div>
        <div className={styles.option + ` ${styles.challenger}`}>
          <div>CHALLENGER</div>
          <div className={styles.details}>
            I'VE MEMORISED THE PASSAGE/VERSE, TEST ME!
          </div>
          <Button
            onClick={() => {
              appData.events.selectGameMode("challenger");
              history.push("/game");
            }}
            variant="medium"
            colorVariant="challenger"
            label="RECITE"
          />
        </div>
      </div>
    </Page>
  );
}
