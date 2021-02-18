import { motion, useAnimation, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "../styles/PtsDropDown.module.css";
import { ReactComponent as Icon } from "../media/Pts.svg";
import framerUtils from "../utils/framerUtils";
import Sleep from "../utils/Sleep";
export interface PtsDropDownProps {
  pts: number;
}

export default function PtsDropDown(props: PtsDropDownProps) {
  const [pts, setPts] = useState(props.pts);
  const [prevPts, setPrevPts] = useState(props.pts);
  const [isStart, setIstSart] = useState(true);
  const ptsMotion = useSpring(props.pts, { duration: 1000 });

  const cardController = useAnimation();
  const textController = useAnimation();

  useEffect(() => {
    const showDropdown = async () => {
      await Promise.all([
        framerUtils.show(textController),
        cardController.start({
          y: 0,
        }),
      ]);
      ptsMotion.set(props.pts);
      await Sleep(2000);
      await Promise.all([
        framerUtils.hide(textController),
        cardController.start({
          y: -100,
        }),
      ]);
      setPrevPts(props.pts);
    };

    if (!isStart) {
      showDropdown();
    } else {
      setIstSart(false);
    }
  }, [props.pts]);

  useEffect(() => {
    const onPtsChange = ptsMotion.onChange(() => {
      setPts(ptsMotion.get());
    });

    return () => {
      onPtsChange();
    };
  }, []);

  return (
    <div>
      <motion.div
        initial={{ x: "-50%", y: -100 }}
        animate={cardController}
        className={styles.card}
      >
        <div>{Math.floor(pts)}</div>
        <Icon className={styles.icon}></Icon>
      </motion.div>

      <motion.div
        initial={{ display: "none", opacity: 0 }}
        animate={textController}
      >
        <div className={styles.text}>+{Math.floor(pts - prevPts)}</div>
      </motion.div>
    </div>
  );
}
