import { useContext } from "react";
import { useHistory } from "react-router";
import { dataContext } from "../context/DataContext";
import bible from "../models/IBook";
import styles from "../styles/BookSelectGroup.module.css";
import BookSelect from "./BookSelect";

export interface BookSelectGroupProps {
  isFromText: boolean;
}

export default function BookSelectGroup(props: BookSelectGroupProps) {
  const history = useHistory();
  const appData = useContext(dataContext);
  const getBookValue = () => {
    if (props.isFromText && appData.state.navigation.fromTextSelectStage > 0) {
      return bible[appData.state.gameSettings.fromBook].abr;
    } else if (
      !props.isFromText &&
      appData.state.navigation.toTextSelectStage > 0
    ) {
      return bible[appData.state.gameSettings.toBook].abr;
    } else return "";
  };
  const getChapterValue = () => {
    if (props.isFromText && appData.state.navigation.fromTextSelectStage > 2) {
      return (appData.state.gameSettings.fromChapter + 1).toString();
    } else if (
      !props.isFromText &&
      appData.state.navigation.toTextSelectStage > 2
    ) {
      return (appData.state.gameSettings.toChapter + 1).toString();
    } else return "";
  };
  const getVerseValue = () => {
    if (props.isFromText && appData.state.navigation.fromTextSelectStage > 4) {
      return (appData.state.gameSettings.fromVerse + 1).toString();
    } else if (
      !props.isFromText &&
      appData.state.navigation.toTextSelectStage > 4
    ) {
      return (appData.state.gameSettings.toVerse + 1).toString();
    } else return "";
  };
  return (
    <div className={styles.container}>
      <BookSelect
        value={getBookValue()}
        label="BOOK"
        onClick={() => {
          history.push("/book");
          appData.events.toPickText(props.isFromText ? 0 : 3);
        }}
        disabled={
          !props.isFromText && appData.state.navigation.toTextSelectStage < 1000
        }
      />
      <div className={styles.divider}>:</div>
      <BookSelect
        value={getChapterValue()}
        label="CHAPTER"
        onClick={() => {
          history.push("/chaptverse");
          appData.events.toPickText(props.isFromText ? 1 : 4);
        }}
        disabled={
          (props.isFromText &&
            appData.state.navigation.fromTextSelectStage < 2) ||
          (!props.isFromText &&
            appData.state.navigation.toTextSelectStage < 1000)
        }
      />
      <div className={styles.divider}>:</div>
      <BookSelect
        value={getVerseValue()}
        label="VERSE"
        onClick={() => {
          history.push("/chaptverse");
          appData.events.toPickText(props.isFromText ? 2 : 5);
        }}
        disabled={
          (props.isFromText &&
            appData.state.navigation.fromTextSelectStage < 4) ||
          (!props.isFromText && appData.state.navigation.toTextSelectStage < 4)
        }
      />
    </div>
  );
}
