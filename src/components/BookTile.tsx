import styles from "../styles/BookTile.module.css";

export interface BookTileProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function BookTile(props: BookTileProps) {
  const handleClick = () => {
    if (!props.disabled) props.onClick();
  };
  return (
    <div
      className={styles.tile + ` ${props.disabled ? styles.disabled : ""}`}
      onClick={handleClick}
    >
      {props.label}
    </div>
  );
}
