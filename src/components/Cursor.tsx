import React from "react";
import styles from "../styles/Cursor.module.css";

export interface CursorProps {
  isError?: boolean;
  isVisible: boolean;
}

const Cursor = React.forwardRef<HTMLDivElement, CursorProps>((props, ref) => {
  return (
    <div
      ref={ref}
      className={
        styles.cursor +
        ` ${props.isError ? styles.error : ""}` +
        ` ${props.isVisible ? styles.visible : styles.invisible}`
      }
    ></div>
  );
});

export default Cursor;
