import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import Page from "../components/Page";
import { dataContext } from "../context/DataContext";
import bible from "../models/IBook";
import styles from "../styles/FinishPage.module.css";

export default function FinishPage() {
  const appData = useContext(dataContext);
  const history = useHistory();
  const recite = () => {
    appData.events.recite();
    history.push("/game");
  };

  const getLink = async () => {
    setHasCopiedLink(true);
    await navigator.clipboard.writeText(
      `https://memble.davidkwong.net/url?gm=${
        appData.state.gameSettings.gameMode === "scholar" ? "s" : "c"
      }&tm=${appData.state.gameSettings.lengthMode === "verse" ? "v" : "p"}&b=${
        appData.state.gameSettings.fromBook
      }&c=${appData.state.gameSettings.fromChapter}&v=${
        appData.state.gameSettings.fromVerse
      }${
        appData.state.gameSettings.lengthMode === "passage"
          ? `&ve=${appData.state.gameSettings.toVerse}`
          : ""
      }`
    );
  };

  const [hasCopiedLink, setHasCopiedLink] = useState(false);
  const pickAnotherVerse = () => {
    appData.events.pickAnotherVerse();
    history.push("/");
  };
  return (
    <Page>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.title}>WELL DONE!</div>
          <div className={styles.verse}>{`${
            bible[appData.state.gameSettings.fromBook].name
          } ${appData.state.gameSettings.fromChapter + 1}:${
            appData.state.gameSettings.fromVerse + 1
          }${
            appData.state.gameSettings.lengthMode === "passage"
              ? `-${appData.state.gameSettings.toVerse + 1}`
              : ""
          }`}</div>
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
              onClick={getLink}
              colorVariant="primary"
              outlined
              label={hasCopiedLink ? "copied" : "copy link to share"}
              fullWidth
              disabled={hasCopiedLink}
              variant="medium"
            />
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
              onClick={getLink}
              colorVariant="primary"
              outlined
              label={hasCopiedLink ? "copied" : "copy link to share"}
              disabled={hasCopiedLink}
              fullWidth
              variant="large"
            />
          </div>

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
