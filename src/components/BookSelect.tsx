import styles from "../styles/BookSelect.module.css";
import Button from "./Button";

export interface BookSelectProps {
  label: string;
  value: string;
  disabled?: boolean;
  onClick: () => void | (() => Promise<void>);
}

export default function BookSelect(props: BookSelectProps) {
  const handleClick = () => {
    if (!props.disabled) {
      props.onClick();
    }
  };
  return (
    <div className={styles.container}>
      <div
        className={
          styles.text +
          ` ${props.disabled || !props.value ? styles.placeholder : ""}`
        }
      >
        {props.value ? props.value : props.label}
      </div>
      <div className={styles.sd}>
        <Button
          label="select"
          onClick={handleClick}
          variant="small"
          colorVariant="primary"
          disabled={props.disabled}
          outlined
        ></Button>
      </div>
      <div className={styles.md}>
        <Button
          label="select"
          onClick={handleClick}
          variant="medium"
          colorVariant="primary"
          disabled={props.disabled}
          outlined
        ></Button>
      </div>
    </div>
  );
}
