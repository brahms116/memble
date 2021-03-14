import Page from "../components/Page";
import styles from "../styles/PickBookPage.module.css";
import { ReactComponent as Icon } from "../media/CloseIcon.svg";
import IconButton from "../components/IconButton";
import BookTile from "../components/BookTile";
import { useHistory } from "react-router";
import { useContext } from "react";
import { dataContext } from "../context/DataContext";
import bible from "../models/IBook";
export default function PickBookPage() {
  const history = useHistory();
  const appData = useContext(dataContext);
  const handlePickBook = (id: number) => {
    appData.events.pickBook(id);
    history.push("/text");
  };
  return (
    <Page>
      <div className={styles.page}>
        <div className={styles.close_button}>
          <IconButton icon={Icon} onClick={() => history.push("/text")} />
        </div>
        <div className={styles.title}>BOOKS</div>

        {bible.map((b) => {
          const isDisabled =
            appData.state.navigation.currentTextSelect > 2 &&
            b.id < appData.state.gameSettings.fromBook;
          return (
            <BookTile
              label={b.name}
              key={b.id}
              disabled={isDisabled}
              onClick={() => {
                handlePickBook(b.id);
              }}
            />
          );
        })}
      </div>
    </Page>
  );
}
