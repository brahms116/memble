import styles from "../styles/BookSelectGroup.module.css";
import BookSelect from "./BookSelect";

export default function BookSelectGroup() {
  return (
    <div className={styles.container}>
      <BookSelect value="" label="BOOK" onClick={() => {}} />
      <div className={styles.divider}>:</div>
      <BookSelect value="" label="CHAPTER" onClick={() => {}} />
      <div className={styles.divider}>:</div>
      <BookSelect value="" label="VERSE" onClick={() => {}} />
    </div>
  );
}
