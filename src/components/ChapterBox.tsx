import styles from "../styles/ChapterBox.module.css";

export interface ChapterBoxProps {
  number: number;
  disabled?: boolean;
  onClick: () => void | (() => Promise<void>);
}

export default function ChapterBox(props: ChapterBoxProps) {
  const handleClick = () => {
    if (!props.disabled) props.onClick();
  };
  return (
    <div
      className={
        styles.box + ` noselect ${props.disabled ? styles.disabled : ""}`
      }
      onClick={handleClick}
    >
      {props.number}
    </div>
  );
}
