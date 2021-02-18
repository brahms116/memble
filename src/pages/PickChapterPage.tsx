import Page from "../components/Page";
import styles from "../styles/PickChapterPage.module.css";
import { ReactComponent as Icon } from "../media/CloseIcon.svg";
import IconButton from "../components/IconButton";
import ChapterBox from "../components/ChapterBox";
export default function PickChapterPage() {
  return (
    <Page>
      <div className={styles.page}>
        <div className={styles.close_button}>
          <IconButton icon={Icon} />
        </div>
        <div className={styles.title}>CHAPTER</div>
        <div className={styles.box_area}>
          <ChapterBox onClick={() => {}} number={1} disabled></ChapterBox>
          <ChapterBox onClick={() => {}} number={2}></ChapterBox>
          <ChapterBox onClick={() => {}} number={3}></ChapterBox>
          <ChapterBox onClick={() => {}} number={4}></ChapterBox>
          <ChapterBox onClick={() => {}} number={5}></ChapterBox>
        </div>
      </div>
    </Page>
  );
}
