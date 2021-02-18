import Button from "../components/Button";
import Page from "../components/Page";
import styles from "../styles/ModePage.module.css";

export default function ModePage() {
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
            onClick={() => {}}
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
            onClick={() => {}}
            variant="medium"
            colorVariant="challenger"
            label="RECITE"
          />
        </div>
      </div>
    </Page>
  );
}
