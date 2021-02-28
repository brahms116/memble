import React from "react";
import { IWordUi } from "../models/IWord";
import VerseMarker from "./VerseMarker";
import Word from "./Word";

export default function WordUIElements(props: { words: IWordUi[] }) {
  return (
    <React.Fragment>
      {props.words.map((word, i) => {
        let withMarker = true;
        if (i === 0) withMarker = true;
        else if (word.verseNumber === props.words[i - 1].verseNumber)
          withMarker = false;
        return withMarker ? (
          <React.Fragment key={i}>
            <VerseMarker
              verseNumber={word.verseNumber}
              isVisible={word.isVisible}
            />
            <Word
              isVisible={word.isVisible}
              word={word.value}
              isHint={word.isHint}
            />
          </React.Fragment>
        ) : (
          <Word
            isVisible={word.isVisible}
            word={word.value}
            isHint={word.isHint}
            key={`d${i}`}
          />
        );
      })}
    </React.Fragment>
  );
}
