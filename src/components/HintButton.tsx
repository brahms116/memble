import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import styles from "../styles/HintButton.module.css";

interface HintButtonProps {
  shouldShow: boolean;
}

export default function HintButton(props: HintButtonProps) {
  const cardController = useAnimation();

  useEffect(() => {
    cardController.start({ y: props.shouldShow ? 0 : -100 });
  }, [props.shouldShow]);
  return (
    <div>
      <motion.div
        className={styles.card}
        animate={cardController}
        initial={{ x: "-50%", y: -100 }}
      >
        STUCK?
      </motion.div>
    </div>
  );
}
