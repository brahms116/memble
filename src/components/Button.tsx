import styles from "../styles/Button.module.css";
import pruneClassString from "../utils/pruneClassString";

export interface ButtonProps {
  onClick: (() => void) | (() => Promise<void>);
  variant: "small" | "medium" | "large";
  colorVariant: "primary" | "scholar" | "challenger" | "error";
  label: string;
  disabled?: boolean;
  outlined?: boolean;
  fullWidth?: boolean;
}

export default function Button(props: ButtonProps) {
  const getClassString = () => {
    const colorVariant = props.disabled
      ? styles.disabled
      : styles[props.colorVariant];
    return pruneClassString(
      `noselect ${styles.button} ${props.variant === "small" && styles.small} ${
        props.variant === "medium" && styles.medium
      } ${props.variant === "large" && styles.large} ${
        props.outlined ? styles.outlined : styles.filled
      } ${props.fullWidth && styles.full_width} ${colorVariant}`
    );
  };

  const handleClick = () => {
    if (!props.disabled) {
      props.onClick();
    }
  };

  return (
    <div className={getClassString()} onClick={handleClick}>
      {props.label.toUpperCase()}
    </div>
  );
}
