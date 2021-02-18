import Button from "../components/Button";
import Page from "../components/Page";
import styles from "../styles/FinishPage.module.css";

export default function FinishPage() {
  return (
    <Page>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.title}>WELL DONE!</div>
          <div className={styles.verse}>GEN 1:1-13</div>
          <div className={styles.status + ` ${styles.scholar}`}>LEARNT</div>
          <div className={styles.sd}>
            <Button
              onClick={() => {}}
              colorVariant="primary"
              label="pick another verse"
              fullWidth
              variant="medium"
            />
          </div>
          <div className={styles.sd}>
            <Button
              onClick={() => {}}
              colorVariant="challenger"
              label="RECITE"
              fullWidth
              variant="medium"
            />
          </div>
          <div className={styles.md}>
            <Button
              onClick={() => {}}
              colorVariant="primary"
              label="pick another verse"
              fullWidth
              variant="large"
            />
          </div>
          <div className={styles.md}>
            <Button
              onClick={() => {}}
              colorVariant="challenger"
              label="RECITE"
              fullWidth
              variant="large"
            />
          </div>
        </div>
      </div>
    </Page>
  );
}
