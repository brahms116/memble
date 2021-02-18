import Page from "../components/Page";
import styles from "../styles/PauseMenuPage.module.css";
import { ReactComponent as icon } from "../media/CloseIcon.svg";
import IconButton from "../components/IconButton";
import Button from "../components/Button";
export default function PauseMenuPage() {
  return (
    <Page>
      <div className={styles.page}>
        <div className={styles.close_button}>
          <IconButton icon={icon} />
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
              onClick={() => {}}
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
              onClick={() => {}}
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
