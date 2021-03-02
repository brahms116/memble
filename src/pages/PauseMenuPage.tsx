import Page from "../components/Page";
import styles from "../styles/PauseMenuPage.module.css";
import { ReactComponent as icon } from "../media/CloseIcon.svg";
import IconButton from "../components/IconButton";
import Button from "../components/Button";
import { useHistory } from "react-router-dom";
import { dataContext } from "../context/DataContext";
import { useContext } from "react";
export default function PauseMenuPage() {
  const history = useHistory();
  const appData = useContext(dataContext);
  const quit = () => {
    appData.events.quit();
    history.push("/");
  };
  return (
    <Page>
      <div className={styles.page}>
        <div className={styles.close_button}>
          <IconButton
            icon={icon}
            onClick={() => {
              history.push("/game");
            }}
          />
        </div>
        <div className={styles.button_group}>
          <div className={styles.sd}>
            <Button
              onClick={() => {}}
              label="SETTINGS"
              colorVariant="primary"
              variant="medium"
              disabled
            />
          </div>
          <div className={styles.sd}>
            <Button
              onClick={quit}
              label="QUIT"
              colorVariant="error"
              variant="medium"
            />
          </div>
          <div className={styles.md}>
            <Button
              onClick={() => {}}
              label="SETTINGS"
              colorVariant="primary"
              variant="large"
              disabled
            />
          </div>
          <div className={styles.md}>
            <Button
              onClick={quit}
              label="QUIT"
              colorVariant="error"
              variant="large"
            />
          </div>
        </div>
      </div>
    </Page>
  );
}
