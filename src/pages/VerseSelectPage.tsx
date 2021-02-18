import BackButton from "../components/BackButton";
import BookSelectGroup from "../components/BookSelectGroup";
import Button from "../components/Button";
import Page from "../components/Page";
import styles from "../styles/VerseSelectPage.module.css";

export default function VerseSelectPage() {
  return (
    <Page>
      <div className={styles.page_container}>
        <div className={styles.page}>
          <div className={styles.back_button}>
            <BackButton />
          </div>
          <div className={styles.title}>PASSAGE</div>
          <div className={styles.group_select_container}>
            <div className={styles.tags}>FROM:</div>
            <BookSelectGroup />
          </div>
          <div className={styles.group_select_container}>
            <div className={styles.tags}>TO:</div>
            <BookSelectGroup />
          </div>
          <div className={styles.sd}>
            <Button
              onClick={() => {}}
              variant="medium"
              colorVariant="primary"
              label="start"
              fullWidth
            />
          </div>
          <div className={styles.md}>
            <Button
              onClick={() => {}}
              variant="large"
              colorVariant="primary"
              label="start"
            />
          </div>
        </div>
      </div>
    </Page>
  );
}
