import { motion, useAnimation } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BackButton from "../components/BackButton";
import BookSelectGroup from "../components/BookSelectGroup";
import Button from "../components/Button";
import Page from "../components/Page";
import PageLoader from "../components/PageLoader";
import { dataContext } from "../context/DataContext";
import styles from "../styles/VerseSelectPage.module.css";
import framerUtils from "../utils/framerUtils";
import Sleep from "../utils/Sleep";

export default function VerseSelectPage() {
  const history = useHistory();
  const appData = useContext(dataContext);
  const confirm = async () => {
    await framerUtils.swapPresence(pageContoller, spinnerController, "flex");
    await appData.events.confirmTextSelect();
    history.push("/mode");
  };
  const pageContoller = useAnimation();
  const spinnerController = useAnimation();
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (appData.state.navigation.fromTextSelectStage === 5) {
      if (appData.state.gameSettings.lengthMode === "verse")
        setIsComplete(true);
      else if (appData.state.navigation.toTextSelectStage === 5)
        setIsComplete(true);
    }
  }, [
    appData.state.navigation.fromTextSelectStage,
    appData.state.navigation.toTextSelectStage,
  ]);
  return (
    <Page>
      <PageLoader controller={spinnerController} />
      <motion.div animate={pageContoller}>
        <div className={styles.page_container}>
          <div className={styles.page}>
            <div className={styles.back_button}>
              <BackButton
                onClick={() => {
                  history.push("/length");
                }}
              />
            </div>
            <div className={styles.title}>
              {appData.state.gameSettings.lengthMode === "passage"
                ? "PASSAGE"
                : "VERSE"}
            </div>
            <div className={styles.group_select_container}>
              {appData.state.gameSettings.lengthMode === "passage" && (
                <div className={styles.tags}>FROM:</div>
              )}
              <BookSelectGroup isFromText />
            </div>
            {appData.state.gameSettings.lengthMode === "passage" && (
              <div className={styles.group_select_container}>
                <div className={styles.tags}>TO:</div>
                <BookSelectGroup isFromText={false} />
              </div>
            )}
            <div className={styles.sd}>
              <Button
                onClick={confirm}
                variant="medium"
                colorVariant="primary"
                label="next"
                fullWidth
                disabled={!isComplete}
              />
            </div>
            <div className={styles.md}>
              <Button
                onClick={confirm}
                variant="large"
                colorVariant="primary"
                label="next"
                disabled={!isComplete}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </Page>
  );
}
