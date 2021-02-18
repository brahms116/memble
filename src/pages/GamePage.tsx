import { motion, useAnimation } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Page from "../components/Page";
import TopBar from "../components/TopBar";
import { dataContext } from "../context/DataContext";
import GameController from "../hooks/GameController";
import styles from "../styles/GamePage.module.css";

export default function GamePage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const coverControl = useAnimation();
  const appData = useContext(dataContext);
  const gameController = GameController(appData);
  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.value);
    appData.events.newLetter(e.currentTarget.value);
  };

  const focusOnInput = () => {
    inputRef?.current?.focus();
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!isTyping) {
      setIsTyping(true);
    }
  };

  const handleCoverButtonClick = async () => {
    focusOnInput();
    await coverControl.start({
      opacity: 0,
    });
    await coverControl.start({
      display: "none",
    });
  };

  const blur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsTyping(false);
  };

  const resumeTyping = () => {
    focusOnInput();
  };

  useEffect(() => {
    const rect = gameController.state.cursorRef.current?.getBoundingClientRect();
    if (inputRef.current && rect) {
      inputRef.current.style.top = `${window.scrollY + rect.top}px`;
    }
  });

  useEffect(() => {
    gameController.events.updateCursorActive(isTyping);
  }, [isTyping]);

  return (
    <Page>
      <motion.div initial={{ opacity: 1 }}>
        <TopBar />
      </motion.div>
      <div className={styles.page}>
        <div className={styles.text}>
          {gameController.state.elements}
          <div
            className={styles.click}
            onClick={() => {
              if (!gameController.state.isAnimating) {
                focusOnInput();
              }
            }}
          ></div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isTyping ? { opacity: 0 } : { opacity: 1 }}
        >
          <div className={styles.button + ` ${styles.md}`}>
            <Button
              onClick={resumeTyping}
              label="resume typing"
              variant="large"
              colorVariant="primary"
            />
          </div>
          <div className={styles.button + ` ${styles.sd}`}>
            <Button
              onClick={resumeTyping}
              label="resume typing"
              variant="medium"
              colorVariant="primary"
            />
          </div>
        </motion.div>
      </div>
      <input
        onChange={handleTextInput}
        type="text"
        className={styles.textbox}
        value=""
        ref={inputRef}
        onBlur={blur}
        onFocus={onFocus}
      ></input>
      <motion.div className={styles.cover} animate={coverControl}>
        <Button
          onClick={handleCoverButtonClick}
          variant="medium"
          colorVariant="primary"
          label="CLICK TO BEGIN"
        />
      </motion.div>
    </Page>
  );
}
