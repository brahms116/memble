import Page from "../components/Page";
import styles from "../styles/PickChapterPage.module.css";
import { ReactComponent as Icon } from "../media/CloseIcon.svg";
import IconButton from "../components/IconButton";
import ChapterBox from "../components/ChapterBox";
import { useHistory } from "react-router";
import { useContext } from "react";
import { dataContext } from "../context/DataContext";
import bible from "../models/IBook";
export default function PickChapterPage() {
  const history = useHistory();
  const appData = useContext(dataContext);
  const isFrom = appData.state.navigation.currentTextSelect < 3;
  const isChapter = appData.state.navigation.currentTextSelect % 3 === 1;
  const isBookSame =
    appData.state.gameSettings.fromBook === appData.state.gameSettings.toBook;
  const isChapterSame =
    appData.state.gameSettings.fromChapter ===
    appData.state.gameSettings.toChapter;
  const chapterCount = isFrom
    ? bible[appData.state.gameSettings.fromBook].chapterCount
    : bible[appData.state.gameSettings.toBook].chapterCount;
  const verseCount = isFrom
    ? bible[appData.state.gameSettings.fromBook].verseCounts[
        appData.state.gameSettings.fromChapter
      ]
    : bible[appData.state.gameSettings.toBook].verseCounts[
        appData.state.gameSettings.toChapter
      ];
  const handleBoxClick = (id: number) => {
    if (isChapter) {
      appData.events.pickChapter(id);
    } else {
      appData.events.pickVerse(id);
    }
    history.push("/text");
  };

  const elementLists: React.ReactNode[] = [];
  for (let i = 0; i < (isChapter ? chapterCount : verseCount); i++) {
    const isDisabled =
      !isFrom &&
      ((isChapter &&
        i < appData.state.gameSettings.fromChapter &&
        isBookSame) ||
        (!isChapter &&
          i < appData.state.gameSettings.fromVerse &&
          isBookSame &&
          isChapterSame));
    elementLists.push(
      <ChapterBox
        key={i}
        number={i + 1}
        onClick={() => {
          handleBoxClick(i);
        }}
        disabled={isDisabled}
      />
    );
  }
  return (
    <Page>
      <div className={styles.page}>
        <div className={styles.close_button}>
          <IconButton
            icon={Icon}
            onClick={() => {
              history.push("/text");
            }}
          />
        </div>
        <div className={styles.title}>{isChapter ? "CHAPTER" : "VERSE  "}</div>
        <div className={styles.box_area}>{elementLists}</div>
      </div>
    </Page>
  );
}
