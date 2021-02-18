import Page from "../components/Page";
import styles from "../styles/PickBookPage.module.css";
import { ReactComponent as Icon } from "../media/CloseIcon.svg";
import IconButton from "../components/IconButton";
import BookTile from "../components/BookTile";
export default function PickBookPage() {
  return (
    <Page>
      <div className={styles.page}>
        <div className={styles.close_button}>
          <IconButton icon={Icon} />
        </div>
        <div className={styles.title}>BOOKS</div>
        <BookTile label="GENESIS" onClick={() => {}} />
        <BookTile label="GENESIS" onClick={() => {}} />
        <BookTile label="GENESIS" onClick={() => {}} />
        <BookTile label="GENESIS" onClick={() => {}} />
      </div>
    </Page>
  );
}
