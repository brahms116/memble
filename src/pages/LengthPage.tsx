import styles from "../styles/LengthPage.module.css";
import { ReactComponent as Single } from "../media/SingleVerse.svg";
import { ReactComponent as Passage } from "../media/Passage.svg";
import React from "react";
import Page from "../components/Page";
import Button from "../components/Button";

export default function LengthPage() {
  return (
    <Page>
      <div className={styles.page}>
        <div className={styles.title}>I AM MEMORISING</div>
        <div className={`${styles.option} ${styles.single_verse}`}>
          <div>A SINGLE VERSE</div>
          <Single className={styles.illustration}></Single>
          <Button
            label="memorise"
            onClick={() => {}}
            variant="small"
            colorVariant="primary"
          ></Button>
        </div>
        <div className={`${styles.option} ${styles.passage}`}>
          <div>A PASSAGE</div>
          <Passage className={styles.illustration}></Passage>
          <Button
            label="memorise"
            onClick={() => {}}
            variant="small"
            colorVariant="primary"
          ></Button>
        </div>
      </div>
    </Page>
  );
}
