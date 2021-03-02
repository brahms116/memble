import Page from "../components/Page";
import styles from "../styles/LandingPage.module.css";
import { ReactComponent as Logo } from "../media/Logo.svg";
import React from "react";
import Button from "../components/Button";
import { useHistory } from "react-router-dom";
export default function LandingPage() {
  const history = useHistory();
  return (
    <Page>
      <div className={styles.page}>
        <div className={styles.logo_container}>
          <Logo className={styles.logo} />
        </div>
        <div className={styles.text_container}>
          <div className={styles.text}>MEMBLE</div>
          <div className={styles.sd}>
            <Button
              onClick={() => {
                history.push("/length");
              }}
              variant="medium"
              fullWidth
              label="play"
              colorVariant="primary"
            ></Button>
          </div>
          <div className={styles.md}>
            <Button
              onClick={() => {
                history.push("/length");
              }}
              variant="medium"
              label="play"
              colorVariant="primary"
            ></Button>
          </div>
        </div>
      </div>
    </Page>
  );
}
