import Page from "../components/Page";
import styles from "../styles/LandingPage.module.css";
import { ReactComponent as Logo } from "../media/Logo.svg";
import React from "react";
import Button from "../components/Button";
export default function LandingPage() {
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
              onClick={() => {}}
              variant="medium"
              fullWidth
              label="play"
              colorVariant="primary"
            ></Button>
          </div>
          <div className={styles.md}>
            <Button
              onClick={() => {}}
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
