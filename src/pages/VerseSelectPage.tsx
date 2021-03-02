import { useContext } from "react";
import { useHistory } from "react-router-dom";
import BackButton from "../components/BackButton";
import BookSelectGroup from "../components/BookSelectGroup";
import Button from "../components/Button";
import Page from "../components/Page";
import { dataContext } from "../context/DataContext";
import styles from "../styles/VerseSelectPage.module.css";

export default function VerseSelectPage() {
  const history = useHistory();
  const appData = useContext(dataContext);
  const confirm = () => {
    appData.events.confirmTextSelect();
    history.push("/mode");
  };
  return (
    <Page>
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
            <BookSelectGroup />
          </div>
          {appData.state.gameSettings.lengthMode === "passage" && (
            <div className={styles.group_select_container}>
              <div className={styles.tags}>TO:</div>
              <BookSelectGroup />
            </div>
          )}
          <div className={styles.sd}>
            <Button
              onClick={confirm}
              variant="medium"
              colorVariant="primary"
              label="next"
              fullWidth
            />
          </div>
          <div className={styles.md}>
            <Button
              onClick={confirm}
              variant="large"
              colorVariant="primary"
              label="next"
            />
          </div>
        </div>
      </div>
    </Page>
  );
}
