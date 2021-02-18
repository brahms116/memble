import { useState } from "react";
import { ReactComponent as Icon } from "../media/BackIcon.svg";
import styles from "../styles/BackButton.module.css";
import pruneClassString from "../utils/pruneClassString";
export interface BackButtonProps {
  onClick?: () => void;
}

export default function BackButton(props: BackButtonProps) {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className={styles.container}
      onClick={props.onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Icon
        className={pruneClassString(
          styles.icon + ` noselect ${isHover && styles.hover}`
        )}
      ></Icon>
      <div
        className={pruneClassString(
          styles.text + ` noselect ${isHover && styles.hover}`
        )}
      >
        BACK
      </div>
    </div>
  );
}
