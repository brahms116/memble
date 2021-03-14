import { AnimationControls, motion } from "framer-motion";
import styles from "../styles/PageLoader.module.css";
export interface PageLoaderProps {
  controller: AnimationControls;
}

export default function PageLoader(props: PageLoaderProps) {
  return (
    <motion.div animate={props.controller} initial={{ display: "none" }}>
      <div className={styles.container}>
        <div className={styles.loader}></div>
      </div>
    </motion.div>
  );
}
