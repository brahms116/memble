import styles from "../styles/IconButton.module.css";
import { useState } from "react";

export interface CloseButtonProps {
  onClick?: () => void;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export default function IconButton(props: CloseButtonProps) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={props.onClick}
    >
      <props.icon
        className={styles.icon + ` ${isHover && styles.hover}`}
      ></props.icon>
    </div>
  );
}
