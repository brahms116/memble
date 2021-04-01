import { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import Page from "../components/Page";
import { dataContext } from "../context/DataContext";

export default function FromURL() {
  const appData = useContext(dataContext);
  const query = new URLSearchParams(useLocation().search);
  let gameMode = query.get("gm");
  let textMode = query.get("tm");
  let book = query.get("b");
  let chapter = query.get("c");
  let verse = query.get("v");
  let verseEnd = query.get("ve");

  if (gameMode) {
    gameMode = gameMode === "s" ? "scholar" : "challenger";
  }
  if (textMode) {
    textMode = textMode === "p" ? "passage" : "verse";
  }
  const history = useHistory();

  const checkUrl = async () => {
    // console.log(gameMode);
    // console.log(textMode);
    // console.log(book);
    // console.log(chapter);
    // console.log(verse);
    // console.log(verseEnd);
    if (gameMode && textMode && book && chapter && verse) {
      let result = false;
      if (textMode === "passage" && verseEnd) {
        result = await appData.events.fromURL(
          textMode,
          gameMode,
          +book,
          +chapter,
          +verse,
          +verseEnd
        );
      } else {
        result = await appData.events.fromURL(
          textMode,
          gameMode,
          +book,
          +chapter,
          +verse
        );
      }
      if (result) history.push("/game");
      else history.push("/error");
    } else {
      history.push("/error");
    }
  };

  useEffect(() => {
    checkUrl();
  }, []);
  return <div />;
}
